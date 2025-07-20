import {
  getCategoryBySlug,
  getAllCategories,
  getAllPages,
  getPageBySlug,
} from "@/lib/contentful";
import { safeSlug } from "@/lib/slugify";
import "@/styles/pages/_page.scss";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Link from "next/link";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  const pages = await getAllPages();

  const categorySlugs = categories.map((category) => ({
    slug: safeSlug(category.fields.slug),
  }));

  const pageSlugs = pages.map((page) => ({
    slug: safeSlug(page.fields.slug),
  }));

  return [...categorySlugs, ...pageSlugs];
}

export default async function SlugPage(props) {
  const { slug } = props.params;

  // Try to find a category
  const category = await getCategoryBySlug(slug);

  if (category) {
    const projects = category.fields.projects || [];

    return (
      <section className="category-gallery">
        {projects.map((project, index) => {
          const thumb = project.fields.thumbnail?.fields?.file?.url;
          const name = project.fields.name;
          const projectSlug = safeSlug(project.fields.slug);

          return (
            <div className="project-thumbnail" key={index}>
              <Link href={`/${slug}/${projectSlug}`}>
                {thumb && (
                  <img
                    src={`https:${thumb}`}
                    alt={name}
                    width={288}
                    height={288}
                  />
                )}
                <div className="project-overlay">
                  <p>{name}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    );
  }

  // If not a category, try to find a page
  const page = await getPageBySlug(slug);

  if (page) {
    const description = page.fields.description;

    return (
      <section className="generic-page">
        <h1>{page.fields.title}</h1>
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(description),
          }}
        />
      </section>
    );
  }

  // If nothing matches
  return <h1>Not found</h1>;
}
