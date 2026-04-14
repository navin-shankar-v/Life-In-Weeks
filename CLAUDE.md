# CLAUDE.md — Life In Weeks

This file provides guidance for AI assistants working in this repository.

## Project Overview

**Life Calculator** is a single-page React application that visualizes a human lifespan as a grid of weeks. Users enter their birth date and see a 100-row × 52-column grid where each dot represents one week. Dots are color-coded: blue (lived), amber (current week), gray (remaining).

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| React | ^19.2.0 | UI framework |
| Vite | ^7.3.1 | Dev server & build tool |
| ESLint | ^9.39.1 | Linting (flat config format) |

**Language:** JavaScript (JSX) — no TypeScript.

## Repository Structure

```
Life-In-Weeks/
├── src/
│   ├── main.jsx          # React entry point — mounts <App /> into #root
│   ├── App.jsx           # Root wrapper — imports and renders <LifeInWeeks />
│   ├── LifeInWeeks.jsx   # Core component — all app logic and rendering
│   ├── index.css         # Global base styles (body, typography, buttons)
│   ├── App.css           # Boilerplate styles (largely unused)
│   └── assets/
│       └── react.svg
├── public/
│   └── vite.svg
├── index.html            # HTML shell with <div id="root">
├── vite.config.js        # Minimal Vite config — React plugin only
├── eslint.config.js      # ESLint flat config (ESLint 9+)
├── package.json
└── README.md
```

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint across all .js/.jsx files
```

## Core Component: `LifeInWeeks.jsx`

This is the only substantive component. Everything lives here.

**State:**
- `birthInput` — string in `YYYY-MM-DD` format, default `"2000-02-17"`
- `hoveredWeek` — zero-based global week index (0–5199) or `null`

**Derived values (via `useMemo`):**
- `birth` — `Date` object parsed from `birthInput` at midnight local time
- `end` — `birth` + 100 years
- `years` — static array `[0, 1, …, 99]`

**Key calculations (recomputed each render, not memoized):**
- `today` — current date at midnight
- `msPerWeek` — `7 * 24 * 60 * 60 * 1000`
- `totalWeeks` — `Math.floor((end - birth) / msPerWeek)` ≈ 5217
- `livedWeeks` — `Math.floor((today - birth) / msPerWeek)`

**Color logic (`getColor(globalWeek)`):**
- `< livedWeeks` → `#3b82f6` (blue)
- `=== livedWeeks` → `#f59e0b` (amber)
- `> livedWeeks` → `#e5e7eb` (gray)

**Rendering:** 100 rows, each with a year label (shown every 5 years) and 52 week dots rendered as `<span>` elements with inline styles.

## Styling Conventions

- **All component styles are inline** — no CSS modules, no Tailwind, no external class names.
- `index.css` provides global resets and base typography only.
- `App.css` is effectively unused boilerplate — do not add styles there.
- Dark theme: background `#111`, text `#fff`.
- When adding styles to `LifeInWeeks.jsx`, use inline style objects consistent with existing patterns.

## ESLint Configuration

Flat config (`eslint.config.js`), ESLint 9 format. Key rules:
- `no-unused-vars`: variables matching `/^[A-Z_]/` are ignored (uppercase constants)
- React Hooks rules enforced (`eslint-plugin-react-hooks`)
- React Refresh rules enforced (`eslint-plugin-react-refresh`)
- Target files: `**/*.{js,jsx}`
- Ignored: `dist/`

Run `npm run lint` before committing.

## What Does Not Exist (Do Not Assume)

- **No TypeScript** — do not add `.ts`/`.tsx` files or `tsconfig.json`
- **No test framework** — no Vitest, Jest, or test files exist
- **No Prettier** — no `.prettierrc` or formatting automation
- **No CSS modules** — no `.module.css` files
- **No environment variables** — no `.env` files, no `import.meta.env` usage
- **No CI/CD** — no `.github/workflows/` or similar
- **No router** — single view only, no React Router

## Key Conventions

1. **Single component architecture** — the app is intentionally minimal. Keep logic in `LifeInWeeks.jsx` unless a clear need arises to extract sub-components.
2. **JSX only** — all files use `.jsx` extension, not `.js`, for files containing JSX.
3. **ES modules** — `package.json` sets `"type": "module"`; use `import`/`export`, not `require`.
4. **No prop drilling needed** — there are no child components receiving props; state is local to `LifeInWeeks`.
5. **Date handling** — always parse dates as `new Date(input + "T00:00:00")` to avoid UTC offset issues causing off-by-one-day errors.
6. **Week indexing** — weeks are zero-based globally: week 0 is the first week of life, week 5199 is near the end.

## Git Workflow

- Main branch: `main`
- Feature/AI work branch: `claude/add-claude-documentation-ztsM5`
- Commits use short, imperative-style messages describing the change
