"use client";

import { aboutHistoryInfo } from "@infos/aboutUsPage/aboutHistorySection.info";
import Image from "next/image";
import Link from "next/link";

import useAboutHistorySection from "@/ui/hooks/useSections/useAboutHistorySection";

export default function AboutUsHistorySection() {
  const { imageSource, setImageSource, activeItem, setActiveItem } =
    useAboutHistorySection();

  return (
    <section className="flex flex-col items-center justify-center w-full mt-96 lg:mt-0 lg:flex-row bg-grayBackground">
      <nav className="relative z-10 flex-1 w-full px-3 py-10 md:px-10 md:py-20">
        <ul className="flex flex-col items-center justify-center w-full lg:items-start text-nowrap gap-y-10">
          {aboutHistoryInfo.map((history) => (
            <li
              key={history.position}
              className="flex flex-col items-center lg:items-start justify-center max-w-[410px] gap-x-3"
              onMouseEnter={() => {
                setImageSource(history.imageSrc);
                setActiveItem(history.position);
              }}
            >
              <Link
                href="/nosotros"
                className={`transition ${
                  activeItem === history.position ? "shadow-inner-link" : ""
                }`}
              >
                <h3 className="inline text-3xl font-semibold tracking-tight lg:text-4xl">
                  {history.date}
                </h3>
              </Link>
              <div>
                <p className="text-lg text-center lg:text-start lg:text-xl text-pretty text-default-400">
                  {history.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative z-20 flex items-center justify-center w-full max-w-[916px] max-h-[530px] flex-2">
        <Image
          src={imageSource}
          alt="Imagen de los servicios de Isolashes"
          height={530}
          width={916}
          className="mb-56 lg:absolute"
        />
      </div>
    </section>
  );
}
