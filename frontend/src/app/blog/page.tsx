import { fetchAPI } from "../utils/fetch-api";
import { delay } from "../utils/api-helpers";

import Blog from "../views/blog";

async function getData(limit: number = 3) {

  await delay(3000);
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = { 
    populate: { 
      cover: { fields: ["url"] },
      authorsBio: {
        populate: "*"
      },
    },
    pagination: {
      start: 0,
      limit: limit,
    }, 
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const res = await fetchAPI(path, urlParamsObject, options);
  return res;
}

export default async function BlogRoute() {
  const data = await getData();
  console.log(data.data[0].attributes.authorsBio.data.attributes.avatar.data.attributes.url, "############### data ###############")

  return <Blog data={data} />;
}


