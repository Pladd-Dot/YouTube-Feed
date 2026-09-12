import React, { useState } from 'react';
import { Code, Copy, Check, Info, FileCode, Layers } from 'lucide-react';

export default function SnippetGenerator({ config }) {
  const [activeTab, setActiveTab] = useState('iframe');
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-app-domain.com';

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

  const embedUrl = `${baseUrl}/embed.html?${queryParams}`;

  // 1. iFrame Snippet Format
  const iframeCode = `<-- YouTube Video Feed Grid Embed -->
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
<script src="${baseUrl}/widget.js" async></script>
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

      <div className="code-block-wrapper">
        <div className="code-header">
          <div className="code-dots">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
          </div>
          <span>{activeTab === 'iframe' ? 'HTML iFrame Snippet' : 'JS Script Tag'}</span>
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check size={14} /> Copied to Clipboard!
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
          <strong>How to paste on any website:</strong> Copy the code snippet above and paste it directly into an <em>Custom HTML Block</em>, <em>Embed Widget</em>, or <em>Page Code Header</em> in WordPress, Webflow, Squarespace, Shopify, or any HTML file.
        </div>
      </div>
    </div>
  );
}
