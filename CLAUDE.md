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

## SECURITY RULES — MANDATORY (read before any change)

This repo is PUBLIC, and so are its GitHub Actions logs. Secrets have leaked from Chad's repos 5-6 times. Never again.

1. No secret value ever goes in code, tests, docs, comments, commit messages, PR text or logs. That includes API keys, admin keys, HMAC/signing secrets, tokens, passwords, and any URL containing `key=`, `token=` or `sso=`. Secrets come from `os.environ[...]` (Lambda environment variables) or `s3://pipeline-token/` only. Tests use obvious fakes like `"test-key"`.
2. Every `aws lambda ...` command in a workflow must end with `> /dev/null`. Lambda API responses include every environment variable, and the logs are public. Never print the environment (`printenv`, `env`, `set -x`, or `print(os.environ)`).
3. Never log or print a secret, even partially, or a request URL that carries one.
4. `.github/scripts/secret_guard.py` runs automatically before every `git commit` and `git push` (via `.claude/settings.json`), and again in CI. If it blocks you, remove the secret and move the value to an environment variable. NEVER bypass, weaken, delete or skip the guard, and never use `--no-verify` or `secret-guard: allow` to get past it without Chad's explicit approval.
5. A new secret needs Chad to add a Lambda environment variable first. Tell him the exact variable name. Code that reads it ships after that.
6. Before finishing, run `python3 .github/scripts/secret_guard.py --tree` and report the result.
7. NEVER build anything that asks for, collects, uploads, stores, emails or processes client identity data — tax IDs, SSNs, passports, driver's licenses, other government IDs, or dates of birth. Chad does not want or need it; identity verification is handled by Rainmaker's own forms. If a task seems to need it, stop and ask Chad.
