import React from 'react';
import { Settings, Key, LayoutGrid, Palette, Sliders, Eye, RefreshCw, Sun, Moon } from 'lucide-react';
import ProfileSelector from './ProfileSelector';

export default function ConfigPanel({
  config,
  setConfig,
  profiles,
  activeProfileId,
  onSelectProfile,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile
}) {
  const COLOR_OPTIONS = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'YouTube Red', value: '#ff0000' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' }
  ];

  return (
    <aside className="config-sidebar">
      <div className="sidebar-title">
        <Settings size={18} />
        <span>Widget Configuration</span>
      </div>

      {/* Multi-Channel Profile Selector */}
      <ProfileSelector
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSelectProfile={onSelectProfile}
        onAddProfile={onAddProfile}
        onUpdateProfile={onUpdateProfile}
        onDeleteProfile={onDeleteProfile}
      />


      {/* API & Channel Section */}
      <div className="form-section">
        <div className="form-section-title">
          <Key size={12} style={{ display: 'inline', marginRight: '4px' }} /> YouTube Data API v3
        </div>

        <div className="form-group">
          <label className="form-label">
            API Key
            <span className="form-hint">(Optional for Demo)</span>
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="AIzaSy..."
            value={config.apiKey}
            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Channel ID
            <span className="form-hint">UC...</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="UC_x5XG1OV2P6uZZ5FSM9Ttw"
            value={config.channelId}
            onChange={(e) => setConfig({ ...config, channelId: e.target.value })}
          />
        </div>
      </div>

      {/* Grid Layout Section */}
      <div className="form-section">
        <div className="form-section-title">
          <LayoutGrid size={12} style={{ display: 'inline', marginRight: '4px' }} /> Grid & Layout
        </div>

        <div className="form-group">
          <label className="form-label">Columns</label>
          <div className="btn-group">
            {[2, 3, 4].map((cols) => (
              <button
                key={cols}
                type="button"
                className={`btn-toggle ${config.columns === cols ? 'active' : ''}`}
                onClick={() => setConfig({ ...config, columns: cols })}
              >
                {cols} Cols
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Max Videos Displayed ({config.maxResults})</label>
          <div className="btn-group">
            {[3, 6, 9, 12].map((num) => (
              <button
                key={num}
                type="button"
                className={`btn-toggle ${config.maxResults === num ? 'active' : ''}`}
                onClick={() => setConfig({ ...config, maxResults: num })}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Styling & Theme Section */}
      <div className="form-section">
        <div className="form-section-title">
          <Palette size={12} style={{ display: 'inline', marginRight: '4px' }} /> Aesthetics & Colors
        </div>

        <div className="form-group">
          <label className="form-label">Accent Color</label>
          <div className="color-picker-grid">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`color-swatch ${config.accentColor === c.value ? 'active' : ''}`}
                style={{ backgroundColor: c.value }}
                title={c.name}
                onClick={() => setConfig({ ...config, accentColor: c.value })}
              />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Widget Theme</label>
          <div className="btn-group" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <button
              type="button"
              className={`btn-toggle ${config.theme === 'dark' ? 'active' : ''}`}
              onClick={() => setConfig({ ...config, theme: 'dark' })}
            >
              <Moon size={14} /> Dark
            </button>
            <button
              type="button"
              className={`btn-toggle ${config.theme === 'light' ? 'active' : ''}`}
              onClick={() => setConfig({ ...config, theme: 'light' })}
            >
              <Sun size={14} /> Light
            </button>
          </div>
        </div>
      </div>

      {/* Feature Toggles Section */}
      <div className="form-section">
        <div className="form-section-title">
          <Eye size={12} style={{ display: 'inline', marginRight: '4px' }} /> Feature Toggles
        </div>

        <div className="switch-row">
          <span className="switch-label">Enable Live Search Bar</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={config.showSearch}
              onChange={(e) => setConfig({ ...config, showSearch: e.target.checked })}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="switch-row">
          <span className="switch-label">Show View Counts</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={config.showViews}
              onChange={(e) => setConfig({ ...config, showViews: e.target.checked })}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="switch-row">
          <span className="switch-label">Show Duration Badge</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={config.showDuration}
              onChange={(e) => setConfig({ ...config, showDuration: e.target.checked })}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </aside>
  );
}
