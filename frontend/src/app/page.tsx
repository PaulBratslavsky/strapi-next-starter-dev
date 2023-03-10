import qs from "qs";
import { sectionRenderer } from "./utils/section-renderer";

const params = (slug: string) =>
  qs.stringify({
    populate: {
      contentSections: {
        populate: [
          "picture",
          "buttons",
          "feature",
          "testimonials.picture",
          "plans.product_features",
          "submitButton",
        ],
      },
    },
    filters: {
      slug: slug,
    },
  });

async function getPageBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?${params(slug)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.json();
}

export default async function HomeRoute() {
  const page = await getPageBySlug("home");

  const contentSections = page.data[0].attributes.contentSections;

  console.log(contentSections);

  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
