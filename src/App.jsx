import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ConfigPanel from './components/ConfigPanel';
import SearchBar from './components/SearchBar';
import VideoGrid from './components/VideoGrid';
import VideoModal from './components/VideoModal';
import SnippetGenerator from './components/SnippetGenerator';
import { fetchYouTubeFeed } from './services/youtubeApi';
import { Monitor, RefreshCw } from 'lucide-react';

const DEFAULT_PROFILES = [
  {
    id: 'demo_default',
    name: 'Demo Tech Channel',
    apiKey: '',
    channelId: ''
  }
];

export default function App() {
  // 1. Channel Profiles State (persisted in localStorage)
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('yt_channel_profiles');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILES;
    } catch (e) {
      return DEFAULT_PROFILES;
    }
  });

  const [activeProfileId, setActiveProfileId] = useState(() => {
    try {
      const savedId = localStorage.getItem('yt_active_profile_id');
      return savedId || 'demo_default';
    } catch (e) {
      return 'demo_default';
    }
  });

  // Save profiles & active ID to localStorage
  useEffect(() => {
    localStorage.setItem('yt_channel_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('yt_active_profile_id', activeProfileId);
  }, [activeProfileId]);

  // Find active profile
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0] || DEFAULT_PROFILES[0];

  // 2. Config state for widget styling & active API/channel
  const [config, setConfig] = useState({
    apiKey: activeProfile.apiKey || '',
    channelId: activeProfile.channelId || '',
    columns: 3,
    maxResults: 50,
    accentColor: '#6366f1',
    theme: 'dark',
    showSearch: true,
    showViews: true,
    showDuration: true
  });

  // Sync config when activeProfile changes
  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      apiKey: activeProfile.apiKey || '',
      channelId: activeProfile.channelId || ''
    }));
  }, [activeProfileId, activeProfile.apiKey, activeProfile.channelId]);

  // Profile Management Handlers
  const handleSelectProfile = (id) => {
    setActiveProfileId(id);
  };

  const handleAddProfile = (newProfile) => {
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
  };

  const handleUpdateProfile = (updated) => {
    setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    // Also sync config input if active
    if (updated.id === activeProfileId) {
      setConfig((prev) => ({
        ...prev,
        apiKey: updated.apiKey,
        channelId: updated.channelId
      }));
    }
  };

  const handleDeleteProfile = (idToDelete) => {
    if (profiles.length <= 1) return;
    const filtered = profiles.filter((p) => p.id !== idToDelete);
    setProfiles(filtered);
    if (activeProfileId === idToDelete) {
      setActiveProfileId(filtered[0].id);
    }
  };

  // Sync apiKey and channelId edits in ConfigPanel back to activeProfile
  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    // Sync API key & Channel ID to active profile if changed
    if (newConfig.apiKey !== activeProfile.apiKey || newConfig.channelId !== activeProfile.channelId) {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === activeProfileId
            ? { ...p, apiKey: newConfig.apiKey, channelId: newConfig.channelId }
            : p
        )
      );
    }
  };

  // Filter & Search state inside live preview
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Video feed data state
  const [videos, setVideos] = useState([]);
  const [isDemo, setIsDemo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Selected Video for Lightbox Modal
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sync document root theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', config.theme);
  }, [config.theme]);

  // Fetch YouTube Feed whenever config parameters change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadData = async () => {
      const res = await fetchYouTubeFeed({
        apiKey: config.apiKey,
        channelId: config.channelId,
        maxResults: config.maxResults,
        query: searchQuery
      });

      if (isMounted) {
        setIsDemo(res.isDemo);
        setVideos(res.videos);
        setError(res.error);
        setLoading(false);
      }
    };

    const timer = setTimeout(loadData, 300);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [config.apiKey, config.channelId, config.maxResults, searchQuery]);

  // Sort local video results
  const processedVideos = React.useMemo(() => {
    let list = [...videos];

    // Sort Videos
    if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    } else if (sortBy === 'popular') {
      list.sort((a, b) => {
        const viewsA = parseInt((a.views || '').replace(/[^0-9]/g, '') || '0', 10);
        const viewsB = parseInt((b.views || '').replace(/[^0-9]/g, '') || '0', 10);
        return viewsB - viewsA;
      });
    }

    return list;
  }, [videos, sortBy]);

  return (
    <div className="app-container">
      <Header isDemo={isDemo} error={error} />

      <main className="main-layout">
        {/* Left Sidebar: Controls & Customization */}
        <ConfigPanel
          config={config}
          setConfig={handleConfigChange}
          profiles={profiles}
          activeProfileId={activeProfileId}
          onSelectProfile={handleSelectProfile}
          onAddProfile={handleAddProfile}
          onUpdateProfile={handleUpdateProfile}
          onDeleteProfile={handleDeleteProfile}
        />

        {/* Right Workspace: Code Snippet & Live Preview */}
        <div className="content-column">
          {/* Top Section: Code Snippet Output */}
          <SnippetGenerator config={config} />

          {/* Bottom Section: Live Interactive Widget Preview */}
          <div className="preview-section">
            <div className="preview-header">
              <h2 className="preview-title">
                <Monitor size={20} style={{ color: config.accentColor }} /> Live Website Widget Preview ({activeProfile.name})
              </h2>
              <button
                type="button"
                className="btn-toggle"
                onClick={() => setSearchQuery('')}
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              >
                <RefreshCw size={12} /> Reset Filters
              </button>
            </div>

            {/* Embedded Live Widget Rendering */}
            <div
              className="widget-preview-wrapper"
              style={{ '--accent-color': config.accentColor }}
            >
              <div className="yt-widget">
                {config.showSearch && (
                  <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    accentColor={config.accentColor}
                  />
                )}

                <VideoGrid
                  videos={processedVideos}
                  columns={config.columns}
                  showViews={config.showViews}
                  showDuration={config.showDuration}
                  accentColor={config.accentColor}
                  onSelectVideo={(video) => setSelectedVideo(video)}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Embedded Video Lightbox Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
