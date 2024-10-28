"use client";

import useFooter from "@hooks/useFooter";
import IsolashesLogo from "@icons/IsolashesLogo";
import {
  footerInfo,
  footerNavigation,
  footerSections,
} from "@infos/footer.info";
import Newsletter from "@navigation/footer/newsletter/Newsletter";
import Link from "next/link";

export default function Footer() {
  const { renderList } = useFooter();

  return (
    <footer className="flex flex-col w-full">
      <div className="max-w-full px-6 pt-20 pb-8 mx-auto lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 md:pr-8">
            <div className="flex items-center justify-start">
              <IsolashesLogo />
            </div>
            <p className="text-md text-default-500">{footerInfo.title}</p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <Link
                  key={item.name}
                  className="text-default-400"
                  href={item.href}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="w-6" />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-16 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                {renderList({
                  title: footerInfo.sectionsTitles.locations,
                  items: footerNavigation.locations,
                })}
              </div>
            </div>
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <>
                {footerSections.map((section, index) => (
                  <div
                    key={index}
                    className={index === 0 ? "" : "mt-10 md:mt-0"}
                  >
                    {renderList(section)}
                  </div>
                ))}
              </>
            </div>
          </div>
        </div>

        <Newsletter />

        <div className="flex flex-wrap justify-between gap-2 pt-8">
          <p className="text-small text-default-400">
            &copy;{footerInfo.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
