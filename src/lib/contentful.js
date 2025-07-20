import { createClient } from "contentful";
import { safeSlug } from "./slugify";

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

export const deliveryClient = createClient({
  space,
  accessToken,
});

export const previewClient = createClient({
  space,
  accessToken: previewAccessToken,
  host: "preview.contentful.com",
});

export async function fetchEntries(
  contentType,
  client = deliveryClient,
  options = {}
) {
  const entries = await client.getEntries({
    content_type: contentType,
    ...options,
  });

  return entries.items;
}

export async function getNavigationMenu() {
  const entries = await deliveryClient.getEntries({
    content_type: "navigationMenu",
    include: 2,
  });

  return entries.items?.[0]?.fields || null;
}

export async function getHomePage() {
  const entries = await deliveryClient.getEntries({
    content_type: "home",
    include: 1,
  });

  return entries.items?.[0]?.fields || null;
}

export async function getAllCategories() {
  const response = await deliveryClient.getEntries({
    content_type: "category",
    limit: 1000,
  });

  return response.items;
}

export async function getAllPages() {
  const response = await deliveryClient.getEntries({
    content_type: "page",
    limit: 1000,
  });

  return response.items;
}

export async function getAllProjects() {
  const response = await deliveryClient.getEntries({
    content_type: "project",
    limit: 1000,
  });

  return response.items;
}

export async function getCategoryBySlug(slug) {
  const categories = await getAllCategories();
  const normalizedSlug = safeSlug(slug);

  return (
    categories.find(
      (category) => safeSlug(category?.fields?.slug) === normalizedSlug
    ) || null
  );
}

export async function getPageBySlug(slug) {
  const pages = await getAllPages();
  const normalizedSlug = safeSlug(slug);

  return (
    pages.find((page) => safeSlug(page?.fields?.slug) === normalizedSlug) ||
    null
  );
}

export async function getProjectBySlug(slug) {
  const projects = await getAllProjects();
  const normalizedSlug = safeSlug(slug);

  return (
    projects.find(
      (project) => safeSlug(project?.fields?.slug) === normalizedSlug
    ) || null
  );
}
