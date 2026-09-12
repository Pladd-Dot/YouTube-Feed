import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layers, Plus, Edit2, Trash2, Check, X, Youtube, AlertCircle } from 'lucide-react';

export default function ProfileSelector({
  profiles,
  activeProfileId,
  onSelectProfile,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  // Form state for creating/editing a profile
  const [formName, setFormName] = useState('');
  const [formApiKey, setFormApiKey] = useState('');
  const [formChannelId, setFormChannelId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openCreateModal = () => {
    setEditingProfile(null);
    setFormName('');
    setFormApiKey('');
    setFormChannelId('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (profile, e) => {
    e.stopPropagation();
    setEditingProfile(profile);
    setFormName(profile.name);
    setFormApiKey(profile.apiKey || '');
    setFormChannelId(profile.channelId || '');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (!formName.trim()) {
      setErrorMsg('Please enter a profile name (e.g. "My Tech Channel").');
      return;
    }

    if (editingProfile) {
      onUpdateProfile({
        ...editingProfile,
        name: formName.trim(),
        apiKey: formApiKey.trim(),
        channelId: formChannelId.trim()
      });
    } else {
      onAddProfile({
        id: 'profile_' + Date.now(),
        name: formName.trim(),
        apiKey: formApiKey.trim(),
        channelId: formChannelId.trim()
      });
    }

    setIsModalOpen(false);
  };

  const modalMarkup = isModalOpen ? (
    <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Youtube size={18} style={{ color: '#ff0000' }} />
            <span>{editingProfile ? 'Edit Channel Profile' : 'Add New Channel Profile'}</span>
          </div>
          <button className="modal-close-btn" onClick={() => setIsModalOpen(false)} type="button">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ gap: '1rem' }}>
          {errorMsg && (
            <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Profile Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. My Tech Channel, Coding Tutorials"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              YouTube API Key
              <span className="form-hint">(Optional for Demo)</span>
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="AIzaSy..."
              value={formApiKey}
              onChange={(e) => setFormApiKey(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">YouTube Channel ID</label>
            <input
              type="text"
              className="form-input"
              placeholder="UC_x5XG1OV2P6uZZ5FSM9Ttw"
              value={formChannelId}
              onChange={(e) => setFormChannelId(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              className="btn-toggle"
              onClick={() => setIsModalOpen(false)}
              style={{ padding: '0.5rem 1rem' }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="copy-btn"
              onClick={handleSave}
              style={{ padding: '0.5rem 1.25rem' }}
            >
              <Check size={14} /> {editingProfile ? 'Save Changes' : 'Create Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="profile-selector-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label className="form-label" style={{ margin: 0 }}>
          <Layers size={14} style={{ color: 'var(--accent-primary)', display: 'inline', marginRight: '4px' }} />
          Saved Channel Profiles
        </label>
        <button
          type="button"
          className="btn-toggle"
          onClick={openCreateModal}
          style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
        >
          <Plus size={12} /> New Profile
        </button>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <select
          className="form-input"
          value={activeProfileId}
          onChange={(e) => onSelectProfile(e.target.value)}
          style={{ fontWeight: '600', paddingRight: '2rem' }}
        >
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} {p.channelId ? `(${p.channelId.slice(0, 8)}...)` : '[Demo]'}
            </option>
          ))}
        </select>

        {activeProfileId !== 'demo_default' && (
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              type="button"
              className="btn-toggle"
              title="Edit Active Profile"
              onClick={(e) => {
                const activeP = profiles.find((p) => p.id === activeProfileId);
                if (activeP) openEditModal(activeP, e);
              }}
              style={{ padding: '0.55rem' }}
            >
              <Edit2 size={13} />
            </button>
            <button
              type="button"
              className="btn-toggle"
              title="Delete Profile"
              onClick={() => onDeleteProfile(activeProfileId)}
              style={{ padding: '0.55rem', color: '#ef4444' }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>

      {modalMarkup && ReactDOM.createPortal(modalMarkup, document.body)}
    </div>
  );
}
