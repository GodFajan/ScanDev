import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas px-6 py-10">
      <div className="absolute inset-0 bg-grid-fade bg-[size:48px_48px] opacity-60" />
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
