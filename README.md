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
- Firebase Authentication integration with local persistent fallback
- Lazy-loaded routes with `React.lazy` and `Suspense`

## Tech Stack

- React
- React Router
- Context API
- Tailwind CSS
- Vite
- Firebase
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

## Firebase Setup

ScanDev supports a real authentication flow with Firebase. Add the following variables to a local `.env` file:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

If these values are not present, the app automatically falls back to browser-based local persistence so the full UI remains demoable.

To enable Firebase login:

1. Create a Firebase project.
2. Enable `Authentication`.
3. Turn on the `Email/Password` sign-in provider.
4. Add a web app and copy the Firebase config values into `.env`.
5. Scan history and report data currently use browser persistence, so Firebase setup is only required for authentication.

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
- How the services layer supports both Firebase and local offline mode
- How the UI was designed to resemble a premium SaaS analysis platform

## Future Scope

- Real GitHub API integration and repository metadata fetching
- AI-driven suggestion generation
- Team workspaces and collaborator sharing
- Report export to PDF
- Trend tracking across repeated scans of the same project
- Deeper code parsing and language-specific heuristics
