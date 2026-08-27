import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/components/about/AboutPage";

const TITLE = "About — Skool Company | Independent Creative Studio";
const DESC =
  "Skool Co. is an independent creative company built around curiosity, strategy and ideas that leave a mark. Discover our story, people, and beliefs.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/about/office.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: "/images/about/office.jpg" },
    ],
  }),
  component: AboutRoute,
});

function AboutRoute() {
  return <AboutPage />;
}
