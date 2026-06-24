# web-builder — project memory

Astro static site for Gracia Group (pre-IPO secondaries research). Built to `dist/`, deployed to S3 + CloudFront by a GitHub Action on push to `main`.

## Model
Use Claude Sonnet 4.6 for work in this repo. It is the committed default in `.claude/settings.json`. Do not use Fable — access is suspended, and resumed Fable sessions error out. If a session is stuck on Fable, start a fresh session rather than resuming.

## Build & deploy
- Build: `npm run build` (must pass before committing).
- Deploy: commit to `main`; the GitHub Action syncs `dist/` to S3 and invalidates CloudFront. No manual deploy step.

## Content structure
Three content collections under `src/content/`, all markdown with frontmatter:
- `companies/` — per-company research notes. Render at `/{slug}/` via `src/pages/[slug].astro` (Hub layout). Schema: `title`, `description` (both required), optional `blurb`, `sector`, `logo`.
- `notes/` — dated research notes. Schema: `title`, `date`, `description`.
- `learn/` — long-form essays. Schema: `title`, `description`, `date`.
The homepage (`src/pages/index.astro`) lists all three collections and holds the client-side search (filters on each item's `data-search` attribute).

## Conventions
- Company notes open with an italic dateline: `*Research note · Month Year*`.
- Shared nav lives in `src/components/Header.astro` (single source of truth for all layouts).
- Quotes attributed to real people are the author's editorial responsibility; do not invent or alter them.
