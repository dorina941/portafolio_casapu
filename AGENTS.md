# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Art portfolio website for Casapu Dorina, built with Next.js 16 (Turbopack). The actual content is static HTML/CSS/JS served from `/public`; the Next.js App Router only provides a root redirect from `/` to `/home.html`.

### Services

| Service | Command | Port |
|---|---|---|
| Next.js Dev Server | `npm run dev` | 3000 |

No database, Docker, or external services are required.

### Lint

The `npm run lint` script calls `next lint`, which was **removed in Next.js 16**. There is currently no working lint command. If ESLint is needed, install and configure it separately.

### Build & Run

- **Dev**: `npm run dev` (starts Next.js with Turbopack on port 3000)
- **Build**: `npm run build`
- **Start (prod)**: `npm run start` (requires a prior build)

### Key gotchas

- The site redirects `/` to `/home.html` via the App Router (`app/page.js`). All portfolio pages (`home.html`, `java-game.html`) live in `/public`.
- Tailwind CSS and Google Fonts are loaded via CDN, so internet access is required for full styling.
