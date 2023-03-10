export default function BottomButtons({ content }) {
  return (
    <section className="py-6 dark:bg-black dark:text-gray-50">
      <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
        <h1 className="text-5xl font-bold leading-none text-center">
          {content.title}
        </h1>
        <p className="text-xl font-medium text-center">{content.description}</p>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
          <a className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">
            |{content.buttons[0].text}
          </a>
          <a
            className="px-8 py-3 text-lg font-normal border rounded dark:bg-gray-100 dark:text-gray-900 dark:border-gray-300"
            href={content.buttons[1].url}
          >
            {content.buttons[1].text}
          </a>
        </div>
      </div>
    </section>
  );
}
