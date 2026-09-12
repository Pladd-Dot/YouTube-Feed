import React from 'react';
import { Play, Eye, Calendar, Film } from 'lucide-react';

export default function VideoGrid({
  videos,
  columns,
  showViews,
  showDuration,
  accentColor,
  onSelectVideo,
  loading
}) {
  if (loading) {
    return (
      <div className={`video-grid cols-${columns}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="empty-state">
        <Film size={40} style={{ opacity: 0.5 }} />
        <h3>No videos match your search</h3>
        <p>Try adjusting your search query or category filters.</p>
      </div>
    );
  }

  return (
    <div className={`video-grid cols-${columns}`} style={{ '--accent-color': accentColor }}>
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-card"
          onClick={() => onSelectVideo(video)}
        >
          <div className="thumbnail-container">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="thumbnail-img"
              loading="lazy"
            />
            {showDuration && video.duration && (
              <span className="duration-badge">{video.duration}</span>
            )}
            <div className="play-overlay">
              <div className="play-btn-circle">
                <Play size={20} fill="white" style={{ marginLeft: '3px' }} />
              </div>
            </div>
          </div>

          <div className="video-info">
            <h4 className="video-title" title={video.title}>
              {video.title}
            </h4>

            <div className="video-meta">
              {showViews && (
                <div className="video-meta-item">
                  <Eye size={13} />
                  <span>{video.views}</span>
                </div>
              )}
              <div className="video-meta-item">
                <Calendar size={13} />
                <span>{new Date(video.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
