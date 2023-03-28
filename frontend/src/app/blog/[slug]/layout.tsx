import React from "react";
import ArticleSelect from "@/app/components/ArticleSelect";

export default async function PostLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { slug: string}
}) {

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-2">{children}</div>
        <aside>
          <ArticleSelect slug={params.slug} />
        </aside>
      </div>
    </section>
  );
}



