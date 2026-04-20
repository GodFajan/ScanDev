import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import PageLoader from "./components/shared/PageLoader";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ScanHistoryPage = lazy(() => import("./pages/ScanHistoryPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const BookmarksPage = lazy(() => import("./pages/BookmarksPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/app" element={<DashboardPage />} />
          <Route path="/app/history" element={<ScanHistoryPage />} />
          <Route path="/app/compare" element={<ComparePage />} />
          <Route path="/app/bookmarks" element={<BookmarksPage />} />
          <Route path="/app/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
