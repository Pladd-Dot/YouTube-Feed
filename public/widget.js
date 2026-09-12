/**
 * YouTube Feed Web Component Widget
 * Usage: <yt-feed-grid channel-id="..."></yt-feed-grid>
 */
class YouTubeFeedGrid extends HTMLElement {
  connectedCallback() {
    const channelId = this.getAttribute('channel-id') || 'DEMO';
    const cols = this.getAttribute('columns') || '3';
    const theme = this.getAttribute('theme') || 'dark';
    const accentColor = this.getAttribute('accent-color') || '#6366f1';
    const showSearch = this.getAttribute('show-search') !== 'false';

    const borderColor = theme === 'light' ? '#e2e8f0' : 'rgba(255, 255, 255, 0.12)';
    const bgColor = theme === 'light' ? '#ffffff' : '#121827';
    const baseUrl = 'https://pladd-dot.github.io/YouTube-Feed';

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .container {
          border: 1px solid ${borderColor};
          border-radius: 16px;
          overflow: hidden;
          background: ${bgColor};
          width: 100%;
        }
        iframe {
          width: 100%;
          height: 720px;
          border: none;
          display: block;
          background: transparent;
        }
      </style>
      <div class="container">
        <iframe
          src="${baseUrl}/public/feed.html?channel=${channelId}&cols=${cols}&theme=${theme}&color=${encodeURIComponent(accentColor)}&search=${showSearch ? '1' : '0'}"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    `;
  }
}

if (!customElements.get('yt-feed-grid')) {
  customElements.define('yt-feed-grid', YouTubeFeedGrid);
}
