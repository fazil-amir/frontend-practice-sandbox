# Practice Apps

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

> React demos on isolated routes — pagination, search, tabs, modals, toasts, infinite scroll, and more.

**Repo:** [github.com/fazil-amir/practice-apps](https://github.com/fazil-amir/practice-apps)

## Quick start

Node 20+ required.

```bash
git clone git@github.com:fazil-amir/practice-apps.git
cd practice-apps
npm install
npm run dev
```

Open `http://localhost:5173` (or the URL Vite prints).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server + HMR |
| `npm run build` | Type-check + production build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build |
| `npm run create-page -- <name>` | Scaffold page + route |

## New demo page

```bash
npm run create-page -- my-demo
npm run create-page -- "Post Filters"   # multi-word — use quotes
npm run create-page -- --help
```

| You type | URL | Component | Nav label |
| --- | --- | --- | --- |
| `my-demo` | `/my-demo` | `MyDemo` | My Demo |
| `Post Filters` | `/post-filters` | `PostFilters` | Post Filters |

Output: `src/pages/<slug>/<slug>.tsx`, `<slug>.css`, and a route in `src/config/routes.tsx`.

### Manual setup

`src/pages/my-demo/my-demo.tsx`:

```tsx
import "./my-demo.css";

export default function MyDemo() {
  return (
    <>
      <h1>My Demo</h1>
      <p>What this demo does.</p>
    </>
  );
}
```

Register in `src/config/routes.tsx`:

```tsx
import MyDemo from "../pages/my-demo/my-demo";

{
  path: "/my-demo",
  label: "My Demo",
  slug: "my-demo",
  element: withShell("my-demo", MyDemo),
},
```

## Project structure

```
scripts/create-page.mjs
src/
  main.tsx
  app/app.tsx          # Shell + sidebar
  config/routes.tsx    # All routes
  pages/<slug>/        # <slug>.tsx + <slug>.css
  services/            # Shared fetch helpers (optional)
  styles/global.css    # Tokens + resets
  styles/shared.css    # Layout, typography, base buttons
```

Every page is wrapped by the shell (max width **1200px** — no extra wrapper needed):

```html
<main class="practice-page practice-page--<slug>">
  <div class="practice-page__inner page-stack">
    <!-- your component -->
  </div>
</main>
```

## Styling

### Three layers

| Layer | File | Use for |
| --- | --- | --- |
| Tokens | `global.css` | Colors, spacing, shadows, radii |
| Shell | `shared.css` | Page chrome, typography, base buttons |
| Page | `<slug>.css` | Demo-only styles — prefix `.practice-page--<slug>` |

One page only → page CSS. Every page → `shared.css`. Theme values → `global.css`.

### Design tokens

Use CSS variables from `global.css` instead of hard-coded colors:

| Token | Use for |
| --- | --- |
| `--bg`, `--surface`, `--surface-muted` | Backgrounds, cards, hovers |
| `--text`, `--text-h`, `--text-muted` | Body, headings, hints |
| `--border`, `--border-subtle` | Borders |
| `--accent`, `--accent-bg`, `--accent-border` | Active / focus |
| `--cta`, `--cta-hover` | Primary buttons |
| `--danger`, `--success`, `--info` | Semantic UI |
| `--shadow-sm`, `--shadow` | Elevation |
| `--radius-sm`, `--radius-md`, `--radius-lg` | Corners |

```css
.practice-page--my-demo .my-card {
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
```

### Built-in (no extra CSS)

`<h1>`, `<h2>`, `<p>`, `<ul>`, plain `<button>`, and `page-stack` spacing work on every page.

### Reusable patterns

Not global — copy the block from an existing page and change the slug prefix:

| Class | Copy from |
| --- | --- |
| `btn-primary` | `javascript.css` |
| `btn-success` / `danger` / `info` | `toasts.css` |
| `practice-card` | `post-pagination.css` |
| `practice-list`, `practice-list__item` | `post-search-debounce.css` |
| `practice-status`, `practice-status--error` | `post-search-debounce.css` |
| `page-search`, `page-pagination` | `post-search-debounce.css`, `post-pagination.css` |
| `tab-bar`, `tab`, `tab--active`, `tab-panel` | `tab-data.css` |
| `modal-overlay`, `modal-dialog` | `modal.css` |
| `toast-container`, `toast`, `toast--*` | `toasts.css` |

## Demos

| Route | Topic |
| --- | --- |
| `/javascript` | Custom `Array.prototype.myMap` |
| `/post-pagination` | Client-side pagination |
| `/tab-data` | Multi-step tabs + validation |
| `/post-search-debounce` | Debounced search |
| `/infinite-scroll` | `IntersectionObserver` list |
| `/modal` | `createPortal` modal |
| `/toasts` | Context + toast portal |
| `/dummy-page` | Scaffold example |

## Troubleshooting

| Problem | Fix |
| --- | --- |
| New page fast | `npm run create-page -- <name>` |
| `create-page` already exists | New name, or delete `src/pages/<slug>/` + route entry |
| Not in sidebar | Entry in `practiceRoutes` without `hideInNav: true` |
| Styles not applying | Import `./<slug>.css`; prefix with `.practice-page--<slug>` |
| Content too wide | Don't set `max-width` on the page root — shell handles it |
| Build fails on `modal.tsx` | Pre-existing strict TS issue in that file |
