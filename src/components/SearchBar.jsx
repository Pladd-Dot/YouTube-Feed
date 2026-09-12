import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  accentColor
}) {
  const CATEGORIES = ['All', 'React', 'JavaScript', 'Web Dev', 'CSS', 'APIs'];

  return (
    <div className="yt-search-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
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

      <div className="widget-tags" style={{ '--accent-color': accentColor }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`tag-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
