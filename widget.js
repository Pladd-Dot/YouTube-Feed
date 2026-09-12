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

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        iframe {
          width: 100%;
          height: 650px;
          border: none;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }
      </style>
      <iframe
        src="http://localhost:3000/embed.html?channel=${channelId}&cols=${cols}&theme=${theme}&color=${encodeURIComponent(accentColor)}&search=${showSearch ? '1' : '0'}"
        allowfullscreen
        loading="lazy"
      ></iframe>
    `;
  }
}

if (!customElements.get('yt-feed-grid')) {
  customElements.define('yt-feed-grid', YouTubeFeedGrid);
}
