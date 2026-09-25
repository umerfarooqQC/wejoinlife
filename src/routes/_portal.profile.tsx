import { createFileRoute } from "@tanstack/react-router";
import { usePortalAuth } from "./_portal";

export const Route = createFileRoute("/_portal/profile")({
  head: () => ({
    meta: [
      { title: "Profile | WeJoinLife" },
      { name: "description", content: "Your WeJoinLife profile settings." },
      { property: "og:title", content: "Profile | WeJoinLife" },
      { property: "og:description", content: "Your WeJoinLife profile settings." },
    ],
  }),
  component: ProfileView,
});

function ProfileView() {
  const { user } = usePortalAuth();
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ fontFamily: "Outfit", fontSize: 26, marginBottom: 8 }}>👤 Profile Settings (/wjl/profile)</h1>
        <p style={{ color: "var(--text-muted)" }}>Client UUID: <code>{user?.clientUuid}</code></p>
      </div>
    </div>
  );
}
