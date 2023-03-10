/* eslint-disable react/no-children-prop */
"use client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function RichText({ content }) {
  return (
    <section className="py-6 dark:bg-black dark:text-gray-50">
      <article className="max-w-2xl px-6 py-24 mx-auto space-y-12">
        <div className="dark:text-gray-100">
          <Markdown>{content}</Markdown>
          <Markdown children={content.content} remarkPlugins={[remarkGfm]} />
        </div>
      </article>
    </section>
  );
}
