import qs from "qs";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Email from "./components/Email";

const params = (slug: string) =>
  qs.stringify({
    populate: {
      contentSections: {
        populate: [
          "picture", 
          "buttons", 
          "feature", 
          "testimonials.picture",
          "plans.product_features"
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
  console.log(contentSections[4]);

  function sectionRenderer(section: any, index: number) {
    switch (section.__component) {
      case "sections.hero":
        return <Hero key={index} data={section} />;
      case "sections.features":
        return <Features key={index} data={section} />;
      case "sections.testimonials-group":
        return <Testimonials key={index} data={section} />;
      case "sections.pricing":
        return <Pricing key={index} data={section} />;
      case "sections.heading":
        return <Email key={index} data={section} />;
      default:
        return null;
    }
  }

  return (
    <main>
      {contentSections.map((section: any, index: number) =>
        sectionRenderer(section, index)
      )}
    </main>
  );
}
