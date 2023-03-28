"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../utils/fetch-api";

import Loader from "../components/Loader";
import Blog from "../views/blog-list";
import PageHeader from "../components/PageHeader";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader heading="Our Blog" text="Checkout Something Cool" />
      <Blog data={data}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMorePosts}
            >
              Load more posts...
            </button>
          </div>
        )}
      </Blog>
    </div>
  );
}

/*

import React from "react";
import Link from "next/link";
import { fetchAPI } from "../utils/fetch-api";

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

  console.log(params)


  const { categories, articles } = (await fetchSideMenuData(category)) as Data;

  function selectedFilter(current: string, selected: string) {
    return current === selected
      ? "px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100"
      : "px-3 py-1 rounded-lg hover:underline dark:bg-violet-400 dark:text-gray-900";
  }

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-2">{children}</div>
        <aside>
          <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">
            <h4 className="text-xl font-semibold">Browse By Category</h4>

            <div>
              <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
                {categories.map((category: Category) => (
                  <Link
                    href={""}
                    className={selectedFilter(category.attributes.slug, "tech")}
                  >
                    #{category.attributes.name}
                  </Link>
                ))}
                <Link href={""} className={selectedFilter("", "filter")}>
                  #all
                </Link>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-semibold">
                  Other Posts You May Like
                </h4>
                <ul className="ml-4 space-y-1 list-disc">
                  {articles.map((article: Article) => (
                    <li>
                      <Link
                        rel="noopener noreferrer"
                        href={`/blog/${article.attributes.slug}`}
                        className={`${
                          slug === article.attributes.slug && "text-violet-400"
                        }  hover:underline hover:text-violet-400 transition-colors duration-200`}
                      >
                        {article.attributes.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
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

*/
