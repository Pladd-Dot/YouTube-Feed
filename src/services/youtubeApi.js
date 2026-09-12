// YouTube Data API v3 Service with Demo Mode Mock Data

export const MOCK_VIDEOS = [
  {
    id: "bMknfKXIFA8",
    title: "React Course 2026 - Beginner to Pro Project Walkthrough",
    description: "Learn modern React with real-world projects, hooks, context, state management, and performance optimization.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-08-15T10:00:00Z",
    channelTitle: "Tech Code Academy",
    views: "142,500",
    duration: "18:42",
    category: "React"
  },
  {
    id: "Ke90Tje7VS0",
    title: "Building Modern Web Apps with Vite, React & Tailwind CSS",
    description: "Step by step guide to creating ultra-fast web applications with clean architecture and customizable UI components.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-08-01T14:30:00Z",
    channelTitle: "Tech Code Academy",
    views: "89,200",
    duration: "24:15",
    category: "Web Dev"
  },
  {
    id: "rfscVS0vtbw",
    title: "10 JavaScript Tips Every Developer Must Know in 2026",
    description: "Boost your productivity with modern JS features: async iteration, optional chaining, nullish coalescing, and proxy objects.",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-07-20T09:15:00Z",
    channelTitle: "Tech Code Academy",
    views: "215,000",
    duration: "12:08",
    category: "JavaScript"
  },
  {
    id: "SqcY0GlETPk",
    title: "CSS Grid vs Flexbox - Complete Visual Guide",
    description: "Master modern CSS layout tools. When to use Flexbox, when to use CSS Grid, and how to combine them seamlessly.",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-07-10T16:00:00Z",
    channelTitle: "Tech Code Academy",
    views: "64,800",
    duration: "15:30",
    category: "CSS"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Fullstack Web Development Roadmap & Tech Stack 2026",
    description: "Everything you need to learn to become a successful fullstack web developer this year.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-06-28T11:45:00Z",
    channelTitle: "Tech Code Academy",
    views: "340,100",
    duration: "32:50",
    category: "Career"
  },
  {
    id: "LDB4uaJ87e0",
    title: "Mastering REST APIs & Fetch / Axios in JavaScript",
    description: "Learn how to fetch live data from third-party APIs like YouTube Data API, handle errors, and manage loading states.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-06-15T08:20:00Z",
    channelTitle: "Tech Code Academy",
    views: "98,400",
    duration: "21:10",
    category: "APIs"
  }
];

/**
 * Format ISO 8601 Duration (e.g. PT18M42S -> 18:42)
 */
function parseDuration(durationStr) {
  if (!durationStr) return "10:00";
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "10:00";
  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);

  const secFormatted = seconds < 10 ? `0${seconds}` : `${seconds}`;
  if (hours > 0) {
    const minFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minFormatted}:${secFormatted}`;
  }
  return `${minutes}:${secFormatted}`;
}

/**
 * Format View Count (e.g. 142500 -> 142.5K)
 */
function formatViews(viewsStr) {
  if (!viewsStr) return "0 views";
  const num = parseInt(viewsStr, 10);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M views";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K views";
  }
  return num + " views";
}

/**
 * Fetch videos from YouTube Data API v3 or return Mock Data
 */
export async function fetchYouTubeFeed({ apiKey, channelId, maxResults = 50, query = "" }) {
  // If API key or channel ID is missing, fallback to Mock Data
  if (!apiKey || !apiKey.trim() || !channelId || !channelId.trim()) {
    console.log("Using Demo Mode Mock Data");
    let filtered = MOCK_VIDEOS;
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = MOCK_VIDEOS.filter(
        (v) => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q)
      );
    }
    return {
      isDemo: true,
      videos: filtered.slice(0, maxResults),
      error: null
    };
  }

  try {
    // 1. Search videos from channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${encodeURIComponent(apiKey.trim())}&channelId=${encodeURIComponent(channelId.trim())}&part=snippet,id&order=date&maxResults=${maxResults}&type=video${query ? `&q=${encodeURIComponent(query)}` : ''}`;

    const res = await fetch(searchUrl);
    const searchData = await res.json();

    if (searchData.error) {
      throw new Error(searchData.error.message || "Failed to fetch from YouTube API");
    }

    if (!searchData.items || searchData.items.length === 0) {
      return { isDemo: false, videos: [], error: "No videos found for this channel ID." };
    }

    const videoIds = searchData.items.map((item) => item.id.videoId).filter(Boolean).join(",");

    // 2. Fetch video details (duration, view count)
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${encodeURIComponent(apiKey.trim())}&id=${videoIds}&part=snippet,statistics,contentDetails`;
    const statsRes = await fetch(statsUrl);
    const statsData = await statsRes.json();

    const formattedVideos = (statsData.items || []).map((item) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      views: formatViews(item.statistics?.viewCount),
      duration: parseDuration(item.contentDetails?.duration),
      category: "YouTube"
    }));

    return {
      isDemo: false,
      videos: formattedVideos,
      error: null
    };
  } catch (err) {
    console.error("YouTube API Error:", err);
    return {
      isDemo: true,
      videos: MOCK_VIDEOS.slice(0, maxResults),
      error: `API Error: ${err.message}. Falling back to Demo Mode.`
    };
  }
}
