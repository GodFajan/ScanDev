# ScanDev

ScanDev is a production-style React application that analyzes developer projects from GitHub repositories and turns them into structured, explainable insight reports. It is designed to feel like a modern SaaS dashboard rather than a basic academic CRUD app, while still aligning with common end-term project evaluation criteria such as authentication, routing, state management, backend integration, and clean UI architecture.

## Problem Statement

Developers and students often struggle to evaluate the real quality of a repository beyond surface-level code inspection. ScanDev addresses that gap by letting users submit a GitHub repository URL and receive a polished analysis experience that highlights:

- Code quality signals
- Missing feature opportunities
- UI/UX improvement suggestions
- Project structure feedback
- A consolidated project score

This makes the platform useful for portfolio review, academic evaluation, and product-minded repo improvement planning.

## Features

- React-only application using functional components
- Authentication flow with login and signup
- Protected dashboard routes
- Persistent per-user scan history
- GitHub repository input and analysis workflow
- Score visualization and analytics cards
- Search and filter for previous scans
- Bookmark saved reports
- Improvement checklist with update support
- Side-by-side repository comparison
- Loading states and error handling
- Supabase-ready backend integration with local persistent fallback
- Lazy-loaded routes with `React.lazy` and `Suspense`

## Tech Stack

- React
- React Router
- Context API
- Tailwind CSS
- Vite
- Supabase (`@supabase/supabase-js`)
- LocalStorage fallback persistence for offline/demo mode
- Lucide React icons

## Architecture

The project follows a clean, scalable structure:

```text
src/
  components/
    dashboard/
    layout/
    shared/
  context/
  hooks/
  pages/
  services/
  styles/
```

Key architectural choices:

- `AuthContext` manages authentication state globally
- `AppContext` manages scans, analytics, bookmarks, and checklist updates
- `services/` isolates auth, storage, scan logic, and backend access
- `pages/` own route-level UI while `components/` stay reusable
- `hooks/useRepoFilters.js` centralizes history filtering behavior

## Supabase Setup

ScanDev supports a real backend flow with Supabase. Add the following variables to a local `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If these values are not present, the app automatically falls back to browser-based local persistence so the full UI remains demoable.

Suggested `scans` table columns for Supabase:

- `id`
- `user_id`
- `repo_url`
- `project_name`
- `created_at`
- `score`
- `status`
- `bookmarked`
- `summary`
- `metrics` (jsonb)
- `insights` (jsonb)
- `suggestions` (jsonb)
- `checklist` (jsonb)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Create a production build:

```bash
npm run build
```

## Usage Guide

1. Create an account or sign in.
2. Open the dashboard and submit a GitHub repository URL.
3. Review the generated project score, summary metrics, and insight panels.
4. Save high-value reports with bookmarks.
5. Track improvement work through the checklist.
6. Explore scan history, filters, and comparison mode.

## Screenshots

Place screenshots in a future `screenshots/` folder and reference them here.

- Landing page placeholder
- Dashboard placeholder
- Scan history placeholder
- Comparison view placeholder

## Viva/Presentation Talking Points

- Why Context API was chosen for global app state
- How protected routes and persistent session handling work
- How lazy loading improves initial route performance
- How the services layer supports both Supabase and local offline mode
- How the UI was designed to resemble a premium SaaS analysis platform

## Future Scope

- Real GitHub API integration and repository metadata fetching
- AI-driven suggestion generation
- Team workspaces and collaborator sharing
- Report export to PDF
- Trend tracking across repeated scans of the same project
- Deeper code parsing and language-specific heuristics
