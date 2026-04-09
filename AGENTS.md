## Cursor Cloud specific instructions

This is a **Next.js 16** art portfolio site (single service). Static HTML/CSS/JS pages are served from `public/`.

### Running the app

- `npm run dev` — starts the dev server on port 3000 (uses Turbopack)
- Root `/` redirects to `/home.html` (the portfolio page); `/java-game.html` is the second page.

### Lint

- `npm run lint` invokes `next lint`, which is **not available in Next.js 16**. There is no ESLint config in the repo. Lint is non-functional until the project adds its own ESLint setup.

### Build

- `npm run build` — standard Next.js production build.

### Notes

- No backend, database, env vars, or external services required.
- Tailwind CSS is loaded from CDN (`cdn.tailwindcss.com`), so internet access is needed for full styling.
- No automated test suite exists in this repo.
