"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../utils/fetch-api";

import Loader from "../components/Loader";
import Blog from "../views/blog";

export default function Profile() {
  const [meta, setMeta] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start, limit) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        populate: {
          cover: { fields: ["url"] },
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
        setData(prevData => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts() {
    const nextPosts = meta.pagination.start + meta.pagination.limit;
    fetchData(nextPosts, process.env.NEXT_PUBLIC_PAGE_LIMIT);
  }

  useEffect(() => {
    fetchData(0, process.env.NEXT_PUBLIC_PAGE_LIMIT);
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <Blog data={data}>
      {meta.pagination.start + meta.pagination.limit <
        meta.pagination.total && (
        <div className="flex justify-center">
          <button
            type="button"
            className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400"
            onClick={loadMorePosts}
          >
            Load more posts...
          </button>
        </div>
      )}
    </Blog>
  );
}
