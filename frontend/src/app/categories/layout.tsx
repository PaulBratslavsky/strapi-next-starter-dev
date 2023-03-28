import React from "react";

import { fetchAPI } from "@/app/utils/fetch-api";
import Link from "next/link";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

async function getCategories() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/categories`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const urlParamsObject = {};
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export default async function CategoriesLayoutRoute({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {};
}) {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
        {categories.data.map((category: Category) => (
          <Link
            href={`/categories/${category.attributes.name}`}
            className="px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100"
          >
            #{category.attributes.name}
          </Link>
        ))}
        <Link
          href={`/categories`}
          className="px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100"
        >
          #all
        </Link>
      </div>
      {children}
    </div>
  );
}
