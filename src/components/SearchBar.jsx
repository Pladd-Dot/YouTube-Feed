import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  accentColor
}) {
  return (
    <div className="yt-search-container">
      <div className="widget-search-bar" style={{ '--accent-color': accentColor }}>
        <Search size={18} style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="widget-search-input"
          placeholder="Search videos in channel feed..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
        <select
          className="widget-sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
