import React, { useState } from 'react';
import { Code, Copy, Check, Info, Layers, FileCode, Globe, Monitor } from 'lucide-react';

export default function SnippetGenerator({ config }) {
  const [activeTab, setActiveTab] = useState('iframe');
  const [useLiveUrl, setUseLiveUrl] = useState(true);
  const [copied, setCopied] = useState(false);

  const LIVE_DOMAIN = 'https://pladd-dot.github.io/YouTube-Feed';
  const LOCAL_DOMAIN = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  const baseUrl = useLiveUrl ? LIVE_DOMAIN : LOCAL_DOMAIN;

  // Construct Query String for Embed
  const queryParams = new URLSearchParams({
    ...(config.apiKey ? { key: config.apiKey } : {}),
    ...(config.channelId ? { channel: config.channelId } : {}),
    cols: config.columns,
    max: config.maxResults,
    theme: config.theme,
    color: encodeURIComponent(config.accentColor),
    search: config.showSearch ? '1' : '0',
    views: config.showViews ? '1' : '0',
    duration: config.showDuration ? '1' : '0'
  }).toString();

  const embedUrl = `${baseUrl}/public/embed.html?${queryParams}`;

  // 1. iFrame Snippet Format
  const iframeCode = `<!-- YouTube Video Feed Grid Embed -->
<iframe
  src="${embedUrl}"
  width="100%"
  height="720"
  style="border: none; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); overflow: hidden;"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy">
</iframe>`;

  // 2. Web Component Script Format
  const scriptCode = `<!-- YouTube Feed Web Component -->
<script src="${baseUrl}/public/widget.js" async></script>
<yt-feed-grid
  ${config.apiKey ? `api-key="${config.apiKey}"` : ''}
  channel-id="${config.channelId || 'DEMO'}"
  columns="${config.columns}"
  max-results="${config.maxResults}"
  theme="${config.theme}"
  accent-color="${config.accentColor}"
  show-search="${config.showSearch}"
></yt-feed-grid>`;

  const activeCode = activeTab === 'iframe' ? iframeCode : scriptCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="snippet-card">
      <div className="snippet-header">
        <div className="snippet-title-group">
          <Code size={20} style={{ color: 'var(--accent-primary)' }} />
          <h3 className="snippet-title">Generated Code Snippet</h3>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Domain Mode Switcher */}
          <div className="tabs-group">
            <button
              className={`tab-btn ${useLiveUrl ? 'active' : ''}`}
              onClick={() => setUseLiveUrl(true)}
              title="Use Live GitHub Pages Domain"
            >
              <Globe size={13} style={{ display: 'inline', marginRight: '4px' }} /> Live Domain
            </button>
            <button
              className={`tab-btn ${!useLiveUrl ? 'active' : ''}`}
              onClick={() => setUseLiveUrl(false)}
              title="Use Localhost URL for local testing"
            >
              <Monitor size={13} style={{ display: 'inline', marginRight: '4px' }} /> Localhost
            </button>
          </div>

          {/* Snippet Format Switcher */}
          <div className="tabs-group">
            <button
              className={`tab-btn ${activeTab === 'iframe' ? 'active' : ''}`}
              onClick={() => setActiveTab('iframe')}
            >
              <Layers size={14} style={{ display: 'inline', marginRight: '4px' }} /> iFrame Embed
            </button>
            <button
              className={`tab-btn ${activeTab === 'script' ? 'active' : ''}`}
              onClick={() => setActiveTab('script')}
            >
              <FileCode size={14} style={{ display: 'inline', marginRight: '4px' }} /> Web Component
            </button>
          </div>
        </div>
      </div>

      <div className="code-block-wrapper">
        <div className="code-header">
          <div className="code-dots">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
          </div>
          <span>{useLiveUrl ? 'Live Production URL' : 'Localhost URL'} • {activeTab === 'iframe' ? 'HTML iFrame Snippet' : 'JS Script Tag'}</span>
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check size={14} /> Copied Snippet!
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Snippet
              </>
            )}
          </button>
        </div>

        <pre className="code-content">
          <code>{activeCode}</code>
        </pre>
      </div>

      <div className="instruction-box">
        <Info size={18} />
        <div>
          <strong>Live Embed Ready:</strong> Your snippet is set to feed from <code>{baseUrl}</code>. Paste this code into WordPress, Webflow, Squarespace, Shopify, or any HTML website to display your YouTube feed live to visitors!
        </div>
      </div>
    </div>
  );
}
