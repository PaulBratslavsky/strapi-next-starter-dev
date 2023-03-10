import qs from "qs";
import type { Metadata } from "next";
import { getStrapiMedia } from "./utils/get-strapi-media";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";

const params = qs.stringify({
  populate: [
    "metadata.shareImage",
    "favicon",
    "notificationBanner.link",
    "navbar.links",
    "navbar.navbarLogo.logoImg",
    "footer.footerLogo.logoImg",
    "footer.menuLinks",
    "footer.legalLinks",
    "footer.socialLinks",
    "footer.categoryLinks.categories",
  ],
});

async function getGlobal() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/global?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();
  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, process.env.NEXT_PUBLIC_STRAPI_URL)],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobal();
  const { notificationBanner, navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );
  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <html lang="en">
      <body>
        {navbar && (
          <Navbar
            links={navbar.links}
            logoUrl={navbarLogoUrl}
            logoText={navbar.navbarLogo.logoText}
          />
        )}
        <main className="dark:bg-black dark:text-gray-100 min-h-screen">{children}</main>
        <Banner data={notificationBanner} />
        {Footer && (
          <Footer
            logoUrl={footerLogoUrl}
            logoText={footer.footerLogo.logoText}
            menuLinks={footer.menuLinks}
            categoryLinks={footer.categoryLinks.categories.data}
            legalLinks={footer.legalLinks}
            socialLinks={footer.socialLinks}
          />
        )}
      </body>
    </html>
  );
}
