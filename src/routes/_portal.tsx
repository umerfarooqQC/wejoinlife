import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { createContext, useContext } from "react";
import { useAuth } from "@/lib/useAuth";

type AuthCtx = ReturnType<typeof useAuth>;
const Ctx = createContext<AuthCtx | null>(null);
export const usePortalAuth = () => useContext(Ctx)!;

export const Route = createFileRoute("/_portal")({ component: PortalLayout });

function PortalLayout() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return (
      <div className="wjl-app" style={{ alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div className="animate-spin" style={{ width: 40, height: 40, border: "3px solid rgba(56,189,248,0.2)", borderTopColor: "#38bdf8", borderRadius: "50%" }} />
        <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading WeJoinLife portal...</span>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="wjl-app">
        <div className="container">
          <div className="card" style={{ maxWidth: 560, margin: "80px auto", textAlign: "center", padding: "48px 24px" }}>
            <div style={{ fontSize: 42, marginBottom: 16 }}>🔒</div>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Login Required</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>
              No active J2EE session found. Please log in on the J2EE application to access the portal.
            </p>
            <a href="/vconnect/login.jsp" className="btn btn-primary">👉 Go to J2EE Login Screen</a>
          </div>
        </div>
      </div>
    );
  }

  const links = [
    { to: "/dashboard", label: "📊 Dashboard" },
    { to: "/seller", label: "🛍️ Seller Portal" },
    { to: "/profile", label: "👤 Profile" },
  ] as const;

  return (
    <Ctx.Provider value={auth}>
      <div className="wjl-app">
        <header className="navbar">
          <div className="navbar-brand">
            <span className="brand-badge">WeJoinLife</span>
            <span className="route-pill">/wjl{location.pathname}</span>
          </div>
          <nav className="navbar-actions">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`nav-link-btn ${location.pathname === l.to ? "active" : ""}`}>
                {l.label}
              </Link>
            ))}
            <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 12 }}>{auth.user?.email}</span>
            <button onClick={() => auth.logout("/vconnect/login.jsp")} className="btn btn-danger" style={{ marginLeft: 8 }}>
              Sign Out
            </button>
          </nav>
        </header>
        <Outlet />
      </div>
    </Ctx.Provider>
  );
}
