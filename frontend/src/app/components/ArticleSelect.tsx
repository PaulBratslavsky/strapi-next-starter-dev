"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { fetchAPI } from "../utils/fetch-api";
import Loader from "./Loader";

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

export default function ArticleSelect({ slug }: { slug: string }) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Data | null>(null);
  const [filter, setFilter] = useState("");

  const fetchData = useCallback(async (filter: string) => {
    setLoading(true);
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

      setData({
        categories: categoriesResponse.data,
        articles: articlesResponse.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(filter);
  }, [filter]);


  function selectedFilter(current: string, selected: string) {
    return current === selected
      ? "px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100"
      : "px-3 py-1 rounded-lg hover:underline dark:bg-violet-400 dark:text-gray-900";
  }

  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Browse By Category</h4>

      {loading || data === null ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
            {data.categories.map((category: Category) => (
              <button
                className={selectedFilter(category.attributes.name, filter)}
                onClick={() => setFilter(category.attributes.name)}
              >
                #{category.attributes.name}
              </button>
            ))}
            <button
              className={selectedFilter("", filter)}
              onClick={() => setFilter("")}
            >
              #all
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
            <ul className="ml-4 space-y-1 list-disc">
              {data.articles.map((article: Article) => (
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
        </>
      )}
    </div>
  );
}
