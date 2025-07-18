import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_ACCESS_TOKEN:
      process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN:
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src", "styles")],
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
};

export default nextConfig;
