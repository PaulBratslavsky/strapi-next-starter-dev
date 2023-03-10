import Image from "next/image"

export default function Blog() {
  return (
    <section className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            id: 1,
            attributes: {
              title: "Noster tincidunt reprimique ad pro",
              slug: "noster-tincidunt-reprimique-ad-pro",
              description: "Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est in graece fuisset, eos affert putent doctus id.",
            },
          }].map((article) => (
            <a
              rel="noopener noreferrer"
              href={`blog/${article.attributes.slug}`}
              key={article.id}
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900"
            >
              {/* <Image
                alt="presentation"
                width="0"
                height="0"
                className="object-cover w-full rounded h-44 dark:bg-gray-500"
                src="https://source.unsplash.com/random/480x360?1"
              /> */}
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {article.attributes.title}
                </h3>
                <span className="text-xs dark:text-gray-400">
                  January 21, 2021
                </span>
                <p>{article.attributes.description}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400"
          >
            Load more posts...
          </button>
        </div>
    </section>
  )
}
