import { getProjectBySlug, getAllProjects } from "@/lib/contentful";
import "@/styles/pages/_project.scss";
import { safeSlug } from "@/lib/slugify";
import Carousel from "@/components/content/Carousel";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

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
      <div className="carousel-container">
        <Carousel
          images={project.fields.images}
          autoplay={false}
          fullScreenOnMobile={false}
          showPagination={true}
        />
      </div>
      <div className="project-copy">
        <p className="name">{project.fields.name}</p>
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(project.fields.description),
          }}
        />
      </div>
    </section>
  );
}
