import { getProjectBySlug, getAllProjects } from "@/lib/contentful";
import "@/styles/pages/_project.scss";
import { safeSlug } from "@/lib/slugify";
import Carousel from "@/components/content/Carousel";

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({
    categorySlug: safeSlug(project.fields.category?.fields?.slug || ""),
    projectSlug: safeSlug(project.fields.slug),
  }));
}

export default async function ProjectPage(props) {
  const { projectSlug } = props.params;

  const project = await getProjectBySlug(projectSlug);

  if (!project) return <h1>Project not found</h1>;

  return (
    <section className="project-wrapper">
      <Carousel
        images={project.fields.images}
        autoplay={false}
        fullScreenOnMobile={false}
        showPagination={true}
      />
    </section>
  );
}
