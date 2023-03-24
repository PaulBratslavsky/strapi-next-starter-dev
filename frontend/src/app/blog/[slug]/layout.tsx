import React from "react";
import Link from "next/link";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-2">{children}</div>
        <aside className="p-4 dark:bg-gray-900 rounded-lg">
          <div>
          <h4 className="text-lg font-semibold">Categories</h4>

            <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
              <Link
                rel="noopener noreferrer"
                href="#"
                className="px-3 py-1 rounded-lg hover:underline dark:bg-violet-400 dark:text-gray-900"
              >
                #MambaUI
              </Link>

            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">More Posts You May Like</h4>
              <ul className="ml-4 space-y-1 list-disc">
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="hover:underline"
                  >
                    Nunc id magna mollis
                  </Link>
                </li>
  
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
