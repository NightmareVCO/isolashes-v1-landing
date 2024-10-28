"use client";

import useServicesSection from "@hooks/useSections/useServicesSection";
import { servicesInfo } from "@infos/mainPage/services.info";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  const { imageSource, setImageSource, activeItem, setActiveItem } =
    useServicesSection();

  return (
    <section className="flex flex-col items-center justify-center w-full mt-96 lg:mt-0 lg:flex-row bg-grayBackground">
      <nav className="relative z-10 flex-1 w-full py-20 ">
        <ul className="flex flex-col items-center justify-center w-full text-nowrap gap-y-10">
          {servicesInfo.map((service) => (
            <li
              key={service.position}
              className="flex flex-row items-center justify-center lg:justify-start w-44 gap-x-3"
              onMouseEnter={() => {
                setImageSource(service.imageSrc);
                setActiveItem(service.position);
              }}
            >
              <p className="text-lg lg:text-xl">{`0${service.position}. `}</p>
              <Link
                href="/servicios"
                className={`transition ${
                  activeItem === service.position ? "shadow-inner-link" : ""
                }`}
              >
                <h3 className="inline text-3xl font-semibold tracking-tight lg:text-4xl">
                  {service.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative z-20 flex items-center justify-center w-full flex-2">
        <Image
          src={imageSource}
          alt="Imagen de los servicios de Isolashes"
          height={540}
          width={540}
          className="lg:absolute"
        />
      </div>
    </section>
  );
}
