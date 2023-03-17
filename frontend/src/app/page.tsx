import { sectionRenderer } from "./utils/section-renderer";
import { getStrapiURL } from "./utils/api-helpers";

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(1), time));

async function getPageBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const url = getStrapiURL();

  // CALLS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
  await delay(2000);
  const res = await fetch(`${url}/api/pages?filters[0]slug=${slug}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
}

export default async function RootRoute() {
  const page = await getPageBySlug("home");
  const contentSections = page.data[0].attributes.contentSections;

  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
