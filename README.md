# 📺 YouTube Feed & Grid Embed Generator

An interactive, responsive web application that connects with the **YouTube Data API v3** to display YouTube channel feeds in a customizable grid with live search capabilities, and generates copy-paste embed code snippets (`<iframe>` and `<script>` formats) for any website.

![YouTube Feed & Grid Embedder](https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop)

## ✨ Features

- **Dual Engine (Live YouTube API + Demo Mode)**: Connect your YouTube API key & Channel ID to pull live video feeds, or use the built-in Demo Mode out of the box.
- **Multi-Channel Profiles**: Save, edit, and switch between multiple YouTube channels (each with its own API Key and Channel ID) with `localStorage` persistence.
- **Customizable Grid Layouts**: Responsive 2, 3, or 4-column layouts.
- **Live Search & Category Filters**: Real-time keyword filtering, sorting (Newest, Most Popular, Oldest), and category tags.
- **Popup Lightbox Video Player**: Viewers can click any video card to launch an embedded popup YouTube player without leaving the website.
- **1-Click Snippet Output**: Generates both responsive `<iframe>` and `<yt-feed-grid>` Web Component script snippets ready for WordPress, Webflow, Squarespace, Shopify, or raw HTML.

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone <your-repo-url>
cd youtube-feed-app
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Free 1-Click Deployment (Vercel / Netlify / GitHub Pages)

To embed your grid onto public websites so your visitors can see it:

1. Push this repository to GitHub.
2. Connect your repo to **Vercel** or **Netlify** (100% Free).
3. Copy your live `<iframe>` snippet and paste it anywhere!

---

## 🛠️ Built With

- **React 18** + **Vite 5**
- **Lucide Icons**
- Modern CSS Glassmorphism Design System
- YouTube Data API v3
