import React from "react";

import Link from "next/link";
import { fetchAPI } from "@/app/utils/fetch-api";
import ArticleSelect from "@/app/components/ArticleSelect";

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI("/categories", {}, options);

    const articlesResponse = await fetchAPI(
      "/articles",
      filter
        ? {
            filters: {
              category: {
                name: filter,
              },
            },
          }
        : {},
      options
    );

    return {
      articles: articlesResponse.data,
      categories: categoriesResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

interface Data {
  articles: Article[];
  categories: Category[];
}

export default async function LayoutRoute({
  params,
  children,
}: {
  params: {
    slug: string;
    category: string;
  };
}) {

  const { slug, category } = params;





  const { categories, articles } = (await fetchSideMenuData(category)) as Data;

console.log(articles,"articles")
console.log(params)


  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-2">{children}</div>
        <aside>
          <ArticleSelect categories={categories} articles={articles} params={params}/>
        </aside>
      </div>
    </section>
  );
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
