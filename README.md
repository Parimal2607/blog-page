## Project Overview

This repository hosts a fully responsive Fitness Blog built on **Next.js (Pages Router)**.  
The homepage showcases the hero banner, featured content, author slider, explore-more carousel, tour guides, comment stream, comment form, and related articles.  
Each article links to a statically generated detail page that reuses the same layout, fetches slug-specific comments, and can lazy-load a Markdown editor for inline edits.

Highlights:

- Centralized mock data for every section (`src/data`).
- Reaction-driven comment experience powered by React Hook Form + Yup + React Toastify.
- Local storage persistence for user comments with editing, skeleton loading, and error handling.
- “Edit Content” button on detail pages that loads the editor via `next/dynamic`.
- BEM-style CSS blocks, handcrafted grids/flex layouts, and zero UI frameworks.

## Tech Stack

- Next.js 14 (Pages Router with `getStaticProps` / `getStaticPaths`)
- React 18 / React Hooks
- `react-hook-form`, `@hookform/resolvers`, `yup`
- `react-toastify`
- Local storage utilities (`src/utils/commentStorage.js`)
- Custom SVG icon library (`src/components/common/Icons.js`)
- Global CSS in `src/styles/globals.css`

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev

# Optional scripts
npm run lint   # eslint
npm run build  # production build
npm run start  # serve build output
```

> Use the Node version defined in `.nvmrc`/`package.json` if available.  
> Google Lato is configured via `next/font` inside `src/pages/_app.js`.

## Project Structure

```
src/
├─ pages/                # Pages Router entry points (index, blog/[slug], _app, _document, 404)
├─ components/
│  ├─ common/            # Inputs, text areas, buttons, icons, reusable fields
│  └─ ui/                # Page sections (Banner, Content, Comments, Author Slider, etc.)
├─ data/                 # Mock data for posts, sections, comments
├─ constants/            # Reactions, form messages, storage keys
├─ utils/                # Local storage helpers for comments
└─ styles/globals.css    # Global CSS + BEM blocks
```

## Core Features

| Feature | Description |
| --- | --- |
| Dynamic blog pages | `getStaticPaths` + `getStaticProps` render every slug from `src/data/posts.js`. |
| Comment system | React Hook Form + Yup validation, emoji reactions, rating stars, toast feedback, edit mode, slug-scoped storage, skeleton & error states. |
| Local storage sync | User comments are merged with seed data per slug and broadcast with a custom `blog-comments-updated` event. |
| Author & Explore sliders | Custom navigation with disabled states, smooth text transitions, and mobile-only carousel for explore cards. |
| Related articles | Cards that deep-link to `/blog/[slug]`, accessible via breadcrumb scroll on the homepage. |
| Lazy editor | “Edit Content” button dynamically imports `BlogEditor` only when needed. |
| Styling | Custom CSS with BEM naming (`blog-header`, `blog-banner`, `blog-content`, `comments`, `comment-form`, `related-articles`, etc.). |

## Data & Configuration

- **Posts**: `src/data/posts.js` (slug, metadata, hero asset, body array).  
- **Homepage content**: `src/data/blogData.js` (banner, explore more, tours, author slider, default comments).  
- **Reactions**: `src/constants/reactions.js` defines the icon, color, label, and rating value used throughout the UI.  
- **Form validation copy**: `src/constants/formMessages.js`.  
- **Local storage keys**: `src/constants/storageKeys.js`.

## Styling Guidelines

- Global styles live in `src/styles/globals.css`.
- Each section uses a dedicated BEM block; legacy `.blog--` classes remain temporarily for incremental migration.
- Responsive breakpoints mainly cover 1024 px, 768 px, 650 px, and 576 px.
- No third-party CSS frameworks—performance is maintained via lean selectors and minimal transitions.

## Deployment

1. Run `npm run build`.  
2. Deploy the `.next` output (Vercel recommended, but any Node host works).  
3. Ensure environment variables (if introduced later) are configured in the hosting platform.

---

Happy building! Extend the data, add new sections, or integrate APIs by following the established BEM/CSS patterns and centralized data approach.
