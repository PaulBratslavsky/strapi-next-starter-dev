import { fetchAPI } from "@/app/utils/fetch-api";
import BlogList from "@/app/views/blog-list";

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      filters: {
        category: {
          name: filter,
        },
      },

      populate: {
        cover: { fields: ["url"] },
        authorsBio: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  const filter = params.category;
  const { data }= await fetchPostsByCategory(filter);
  return <BlogList data={data} />;
}
