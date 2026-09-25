import { createFileRoute } from "@tanstack/react-router";
import { usePortalAuth } from "./_portal";

export const Route = createFileRoute("/_portal/seller")({
  head: () => ({
    meta: [
      { title: "Seller Portal | WeJoinLife" },
      { name: "description", content: "Manage your WeJoinLife seller workspace and shops." },
      { property: "og:title", content: "Seller Portal | WeJoinLife" },
      { property: "og:description", content: "Manage your WeJoinLife seller workspace and shops." },
    ],
  }),
  component: SellerView,
});

function SellerView() {
  const { user } = usePortalAuth();
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ fontFamily: "Outfit", fontSize: 26, marginBottom: 8 }}>🛍️ Seller Portal (/wjl/seller)</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>
          Seller workspace for merchant account: <strong>{user?.email}</strong>
        </p>
        <p>Authorized Site IDs: <code>{user?.siteIds?.join(", ") || "No shops"}</code></p>
      </div>
    </div>
  );
}
