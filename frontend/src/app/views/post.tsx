import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { postRenderer } from "../utils/post-renderer";

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  // console.log(data.attributes.blocks);
  const { title, description, slug, publishedAt, cover } = data.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);

  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
          {title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
          <div className="flex items-center md:space-x-2">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
            )}
            <p className="text-sm dark:text-violet-400">
              Paul brats • July 19th, 2021
            </p>
          </div>
        </div>
      </div>

      <div className="dark:text-gray-100">
        <p>{description}</p>

        {data.attributes.blocks.map((section: any, index: number) =>
          postRenderer(section, index)
        )}
      </div>
    </article>
  );
}
