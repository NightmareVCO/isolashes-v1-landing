import "@styles/globals.css";

import { Providers } from "@app/providers";
import { fontSpartan } from "@config/fonts";
import { siteConfig } from "@config/site";
import { getSessionUser } from "@data/auth.data";
import Footer from "@navigation/footer/Footer";
// import Banner from "@navigation/navbar/banner/Banner";
import Navbar from "@navigation/navbar/Navbar";
import clsx from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export const revalidate = 3600 * 24;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <html lang="es" className="light scroll-smooth">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background antialiased",
          fontSpartan?.className,
        )}
      >
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <div className="flex-grow">
              {/* <Banner /> */}
              <Navbar user={user} />
              <main>{children}</main>
            </div>
            <div className="w-full">
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
