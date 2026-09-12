import React from 'react';
import { Youtube, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Header({ isDemo, error, onResetDemo }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-group">
          <div className="logo-icon">
            <Youtube size={24} />
          </div>
          <div className="logo-text">
            <h1>YouTube Feed & Grid Embedder</h1>
          </div>
          <span className="logo-badge">
            <Sparkles size={12} /> API v3 Ready
          </span>
        </div>

        <div className="header-actions">
          {error ? (
            <div className="mode-badge" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
              <AlertCircle size={14} /> API Warning: Demo Mode Active
            </div>
          ) : isDemo ? (
            <div className="mode-badge demo" title="Enter your YouTube API Key & Channel ID to connect live feed">
              <Sparkles size={14} /> Running Demo Mode
            </div>
          ) : (
            <div className="mode-badge live">
              <CheckCircle2 size={14} /> Live YouTube Feed Connected
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
