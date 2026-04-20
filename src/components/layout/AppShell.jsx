import { Bell, Bookmark, ChartColumn, GitCompareArrows, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navigation = [
  { label: "Overview", to: "/app", icon: LayoutDashboard, end: true },
  { label: "History", to: "/app/history", icon: ChartColumn },
  { label: "Compare", to: "/app/compare", icon: GitCompareArrows },
  { label: "Bookmarks", to: "/app/bookmarks", icon: Bookmark },
  { label: "Settings", to: "/app/settings", icon: Settings },
];

function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-4 md:px-6">
        <aside className="panel hidden w-[280px] shrink-0 flex-col justify-between p-6 lg:flex">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-accent/15 bg-accent/5 px-4 py-2 text-sm font-semibold text-accent">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                ScanDev
              </div>
              <h1 className="mt-5 font-display text-2xl font-bold">
                Ship better repos with sharper feedback.
              </h1>
            </div>
            <nav className="space-y-2">
              {navigation.map(({ label, to, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-ink text-white shadow-glow"
                        : "text-slate-500 hover:bg-slate-100 hover:text-ink"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-900 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Workspace</p>
                  <p className="mt-1 font-semibold">{user?.name}</p>
                </div>
                <Bell className="h-5 w-5 text-white/70" />
              </div>
              <p className="mt-4 text-sm text-white/70">{user?.role}</p>
            </div>
            <button type="button" onClick={handleLogout} className="button-secondary w-full gap-2">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="panel mb-4 flex items-center justify-between p-4 lg:hidden">
            <div>
              <p className="text-sm font-semibold text-accent">ScanDev</p>
              <p className="text-sm text-slate-500">{user?.name}</p>
            </div>
            <button type="button" onClick={handleLogout} className="button-secondary px-4 py-2">
              Sign out
            </button>
          </div>
          <div className="panel mb-4 flex gap-2 overflow-x-auto p-3 lg:hidden">
            {navigation.map(({ label, to, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-ink text-white" : "bg-slate-100 text-slate-500"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppShell;
