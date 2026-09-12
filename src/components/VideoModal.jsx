import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, Eye, Youtube } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title" title={video.title}>
            {video.title}
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-player-container">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="modal-body">
          <div className="video-meta" style={{ marginBottom: '0.5rem' }}>
            <div className="video-meta-item">
              <Youtube size={14} style={{ color: '#ff0000' }} />
              <strong style={{ color: 'var(--text-primary)' }}>{video.channelTitle}</strong>
            </div>
            <div className="video-meta-item">
              <Eye size={13} />
              <span>{video.views}</span>
            </div>
            <div className="video-meta-item">
              <Calendar size={13} />
              <span>{new Date(video.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>

          <p className="modal-description">{video.description}</p>

          <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="copy-btn"
              style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
            >
              Watch on YouTube <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
