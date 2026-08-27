import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProjectBySlug } from "@/data/projects-data";
import ProjectDetailPage from "@/components/project/ProjectDetailPage";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.project) {
      return {
        meta: [{ title: "Project Not Found — Skool Company" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — ${project.category} | Skool Company Case Study`;
    const desc = `${project.tagline} Discover how Skool Company delivered ${project.category} for ${project.client}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: project.heroImage },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: project.heroImage },
      ],
    };
  },
  component: WorkProjectRoute,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Project Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The project case study you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  ),
});

function WorkProjectRoute() {
  const { project } = Route.useLoaderData();
  return <ProjectDetailPage project={project} />;
}
