# ScanDev

ScanDev is a premium React-based Developer Project Analyzer that reviews GitHub repositories and turns them into structured product feedback. Instead of presenting raw metrics in a basic student dashboard, ScanDev is designed to feel like a real SaaS platform with authentication, protected routes, persistent user sessions, analytics, saved reports, and an opinionated dashboard experience.

It is built to solve an academic and real-world problem at the same time:

- Students need a strong end-term project that demonstrates modern React skills, routing, state management, backend integration, and clean UI architecture.
- Developers need a clearer way to evaluate project quality, identify missing product depth, and prioritize improvements.

ScanDev combines both goals into one production-style application.

## Live Idea

User flow:

1. Sign up or log in
2. Submit a GitHub repository URL
3. Receive an insight report with score, metrics, suggestions, and improvement checklist
4. Revisit reports through scan history
5. Filter, bookmark, and compare projects

## Problem Statement

Most student and developer projects are judged manually and inconsistently. Reviewers often focus only on whether a project runs, while missing deeper issues such as weak structure, missing product thinking, shallow feature scope, or poor UX maturity.

ScanDev addresses this by creating a guided review system where a repository can be analyzed through a product-engineering lens. The application helps users understand:

- code quality maturity
- project structure clarity
- missing features and scope gaps
- UI/UX weaknesses
- overall project readiness

This makes the platform useful for:

- academic evaluation
- portfolio refinement
- self-review before project submission
- product-minded repository improvement planning

## Core Highlights

- Premium SaaS-style interface built with React and Tailwind CSS
- Functional components only
- Authentication with Firebase
- Protected application routes
- Context API for global auth and dashboard state
- Lazy-loaded pages using `React.lazy` and `Suspense`
- GitHub repository input and analysis flow
- Persistent scan history per user session
- Search and filter for scanned repositories
- Saved reports and bookmarks
- Improvement checklist workflow
- Side-by-side repository comparison
- Skeleton loading states and graceful empty states
- Local persistence fallback for smooth demo behavior

## Feature Breakdown

### Authentication and Access Control

- User signup and login
- Firebase-backed authentication
- Persistent session handling
- Protected dashboard routes
- Logout support

### Repo Analysis Experience

- GitHub repository URL input
- Auto-generated report model from analysis heuristics
- Project quality score out of 10
- Repo summary and metric cards
- Product, UI/UX, and engineering suggestions
- Insight list for structured interpretation

### Dashboard and Productivity

- Analytics cards for total scans, average score, bookmarks, and top score
- Recent scan trend visualization
- Improvement checklist interaction
- History view with search and filtering
- Bookmark management
- Repository comparison page

### UX and Presentation Quality

- Premium visual system and spacing rhythm
- Strong typography hierarchy
- Responsive layout for desktop and smaller screens
- Card-based dashboard composition
- Smooth hover states and transitions
- Route-level lazy loading

## Tech Stack

- React
- React Router
- Context API
- Tailwind CSS
- Vite
- Firebase Authentication
- LocalStorage
- Lucide React

## Architecture Overview

The codebase is organized for scalability and clarity.

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

### Folder Responsibilities

- `components/`
  Reusable UI pieces such as dashboard widgets, layout wrappers, shared route guards, and loading states.

- `pages/`
  Route-level screens such as landing, login, signup, dashboard, history, compare, bookmarks, and settings.

- `context/`
  Global app state management through React Context.

- `hooks/`
  Reusable custom hooks such as scan filtering logic.

- `services/`
  Data access and integration logic including authentication, report persistence, and client configuration.

- `styles/`
  Global Tailwind and design token styles.

## State Management Design

ScanDev uses React Context instead of adding an external state library because the app’s state shape is clean and centered around two major concerns:

- authentication state
- dashboard/report state

### `AuthContext`

Responsible for:

- current user
- login
- signup
- logout
- auth loading state
- auth persistence

Main file:
- [src/context/AuthContext.jsx](src/context/AuthContext.jsx)

### `AppContext`

Responsible for:

- scan list
- active scan
- analytics summary
- bookmark updates
- checklist updates
- scan creation and deletion

Main file:
- [src/context/AppContext.jsx](src/context/AppContext.jsx)

## Routing Structure

Public routes:

- `/`
- `/login`
- `/signup`

Protected routes:

- `/app`
- `/app/history`
- `/app/compare`
- `/app/bookmarks`
- `/app/settings`

Protected route logic lives in:
- [src/components/shared/ProtectedRoute.jsx](src/components/shared/ProtectedRoute.jsx)

## Authentication Setup with Firebase

ScanDev uses Firebase Authentication for login and signup.

### Required Environment Variables

Create a local `.env` file using the values from your Firebase web app:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Reference example:
- [.env.example](.env.example)

### Firebase Console Setup

1. Create a Firebase project
2. Add a Web App
3. Enable `Authentication`
4. Enable the `Email/Password` provider
5. Add your deployed Netlify domain inside `Authentication` → `Settings` → `Authorized domains`

### Current Backend Scope

Firebase is currently used for:

- signup
- login
- logout
- persisted auth state

Repository reports, history, bookmarks, and checklist data currently use browser persistence so the project stays easy to demo and does not require Firestore setup.

## Local Development

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Create production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment

ScanDev is configured for deployment on Netlify.

### Netlify Build Settings

- Build command: `npm run build`
- Publish directory: `dist`

Netlify SPA redirect support is configured in:
- [netlify.toml](netlify.toml)

### Netlify Environment Variables

Add the same Firebase environment variables in Netlify:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

After deployment, add the Netlify domain to Firebase authorized domains or login will fail on the live site.

## Product Walkthrough

### Landing Page

The landing page introduces ScanDev as a product-quality repository analysis platform and frames the application as a polished SaaS experience.

### Authentication Pages

Login and signup pages are designed to feel product-grade while remaining simple and focused. They support Firebase auth when configured and local fallback when not.

### Dashboard

The dashboard is the heart of the app and includes:

- new repo scan creation
- summary cards
- score gauge
- report metrics
- analytics trend chart
- history list
- suggestions
- insights
- checklist actions

### History and Search

Users can revisit previous reports, search by repository or project name, and filter bookmarked or high-scoring projects.

### Comparison

Users can compare two repositories side by side to understand quality differences and project maturity gaps.

### Bookmarks

Bookmarked reports can be revisited quickly for demos, reviews, or submission preparation.

## Reusable Engineering Decisions

### Why React Context?

The app has medium-complexity shared state, and Context keeps the architecture simple, readable, and explainable in viva without introducing unnecessary dependency overhead.

### Why Vite?

Vite gives a fast development experience and clean modern React build tooling.

### Why Tailwind CSS?

Tailwind made it easier to build a strong visual system quickly while still maintaining consistent spacing, card structure, and component styling.

### Why Firebase only for auth?

Authentication is the critical academic requirement for backend integration. Keeping report storage local reduced deployment friction and allowed the app to remain stable and demo-friendly while still supporting real user authentication.

## Screenshots

Suggested screenshot sections for future updates:

- Landing page hero
- Signup and login
- Dashboard overview
- Scan history
- Comparison page
- Bookmarks page

You can add a `screenshots/` folder later and update this section with actual images.

## Viva / Presentation Talking Points

You can explain the project using these themes:

- The project solves a real evaluation problem for student and developer repositories
- React functional components are used throughout the application
- Routing is split between public and protected sections
- Context API separates authentication and product state cleanly
- Firebase Authentication provides real login capability
- Local persistence keeps the project easy to demonstrate without complex backend setup
- Lazy loading improves perceived performance and keeps the app organized by route
- The UI was intentionally designed to feel like a modern SaaS dashboard rather than a basic academic CRUD app

## Current Limitations

- Repository analysis is heuristic-based rather than using live GitHub code parsing
- Scan data is stored locally rather than in Firestore or another cloud database
- There is no export flow yet for PDF or shareable reports
- AI-based suggestions are currently mocked through curated heuristics

## Future Scope

- Integrate the GitHub API for repository metadata
- Add Firestore-backed report persistence
- Add AI-powered recommendation generation
- Track repeated scans over time for trend analysis
- Support team collaboration and shared workspaces
- Export reports as PDF
- Add issue categorization and deeper code-quality insights

## Repository

GitHub repository:

- https://github.com/GodFajan/ScanDev

## Author

Built as `ScanDev`, a production-style React end-term project focused on modern frontend engineering, product thinking, and premium UI execution.
