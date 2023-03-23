import { sectionRenderer } from "./utils/section-renderer";
import { delay } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

async function getPageBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  // CALLS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
  await delay(2000);

  const path = `/pages`;
  const urlParamsObject = { filters: { slug } };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export default async function RootRoute() {
  const page = await getPageBySlug("home");
  const contentSections = page.data[0].attributes.contentSections;

  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
