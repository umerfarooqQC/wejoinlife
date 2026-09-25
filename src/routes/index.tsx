import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WeJoinLife Portal" },
      { name: "description", content: "WeJoinLife member and seller portal." },
      { property: "og:title", content: "WeJoinLife Portal" },
      { property: "og:description", content: "WeJoinLife member and seller portal." },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
});
