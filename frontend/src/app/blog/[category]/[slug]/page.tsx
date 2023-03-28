import Post from "@/app/views/post";
import { fetchAPI } from "@/app/utils/fetch-api";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      authorsBio: { fields: ["name", "avatar"] },
      category: { fields: ["name"] },
      blocks: {
        populate: "*"
      }
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export default async function PostRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  if (data.data.length === 0) return <h2>no pos found</h2>;
  return <Post data={data.data[0]} />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(path, {
    populate: ['category']
  }, options);

  console.log(articleResponse);

  return articleResponse.data.map(
    (article: {
      attributes: {
        slug: string;
        category: {
          slug: string,
        }
      };
    }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
  );
}