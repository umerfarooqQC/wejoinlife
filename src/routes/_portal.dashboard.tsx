import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePortalAuth } from "./_portal";
import { getAccessToken } from "@/lib/authStore";
import { apiClient } from "@/lib/api";

export const Route = createFileRoute("/_portal/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | WeJoinLife" },
      { name: "description", content: "Your WeJoinLife account dashboard and session details." },
      { property: "og:title", content: "Dashboard | WeJoinLife" },
      { property: "og:description", content: "Your WeJoinLife account dashboard and session details." },
    ],
  }),
  component: DashboardView,
});

function DashboardView() {
  const { user } = usePortalAuth();
  const [apiResult, setApiResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const token = getAccessToken();

  const testApi = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/wjlapi/api/v1/auth/me");
      setApiResult({
        sentHeader: token ? `Bearer ${token.substring(0, 30)}...` : "None",
        status: res.status,
        timestamp: new Date().toLocaleTimeString(),
        data: res.data,
      });
    } catch (err: any) {
      setApiResult({ error: err.message, status: err.response?.status });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "Outfit", fontSize: 28, fontWeight: 700 }}>Authorized Dashboard (/wjl/dashboard)</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
            Single Sign-On verified via J2EE Cookie ➔ Exchanged for in-memory Bearer Token.
          </p>
        </div>
        <button onClick={testApi} disabled={loading} className="btn btn-primary">
          {loading ? "Calling..." : "⚡ Call Protected API (with Bearer Header)"}
        </button>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-label">User Email</div>
          <div className="metric-value">{user?.email || "N/A"}</div>
          <div className="metric-sub">Client ID: #{user?.clientId || "N/A"}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Assigned Role</div>
          <div className="metric-value" style={{ textTransform: "capitalize" }}>{user?.role || "User"}</div>
          <div className="metric-sub">Profile: {user?.profile || "Default"}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">In-Memory Bearer Token</div>
          <div className="metric-value" style={{ fontSize: 13, color: "#38bdf8", fontFamily: "monospace" }}>
            {token ? `${token.substring(0, 20)}...` : "None"}
          </div>
          <div className="metric-sub" style={{ color: "var(--accent-emerald)" }}>✓ Memory Only (XSS Safe)</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Current Route</div>
          <div className="metric-value" style={{ color: "var(--accent-glow)" }}>/wjl/dashboard</div>
          <div className="metric-sub">Base Path: /wjl/</div>
        </div>
      </div>

      <div className="card">
        <div className="code-title-bar">
          <span>AUTHENTICATED USER SESSION DETAILS</span>
          <span style={{ color: "var(--accent-emerald)" }}>HTTP 200 OK</span>
        </div>
        <pre className="code-container">{JSON.stringify(user, null, 2)}</pre>
        {apiResult && (
          <div style={{ marginTop: 20 }}>
            <div className="code-title-bar">
              <span>LIVE API EXECUTION via {apiResult.sentHeader} at {apiResult.timestamp}</span>
              <span style={{ color: "var(--accent-emerald)" }}>Status: {apiResult.status}</span>
            </div>
            <pre className="code-container">{JSON.stringify(apiResult.data ?? apiResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
