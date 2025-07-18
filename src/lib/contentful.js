import { createClient } from "contentful";

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
