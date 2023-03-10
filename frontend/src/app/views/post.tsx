import Image from "next/image";

export default function Post() {
  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
          hello world
        </h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
          <div className="flex items-center md:space-x-2">
            {/* <Image
                  src="https://source.unsplash.com/75x75/?portrait"
                  alt=""
                  width="0"
                  height="0"
                  className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                /> */}
            <p className="text-sm dark:text-violet-400">Paul brats • July 19th, 2021</p>
          </div>
        </div>
      </div>
      <div className="dark:text-gray-100">
        <p>article content</p>
      </div>
    </article>
  );
}
