import Blog from "../views/blog";

async function getData() {

  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.json();
}

export default async function BlogRoute() {
  const data = await getData();
  console.log(data);

  return <Blog />;
}
