import { mainPageImages, servicesPageImages } from "@config/images";
import Icon from "@ui/icon/Icon";
import ParallaxImages from "@ui/parallax/ParallaxImages";
import Image from "next/image";

export type ServicesCategorySectionProperties = {
  category: string;
  description: string;
  services: {
    name: string;
    price: number;
  }[];
  index: number;
};

export default function ServicesCategorySection(
  servicesInCategory: ServicesCategorySectionProperties,
) {
  return (
    <article className="flex flex-col max-w-full lg:min-h-[530px] mx-auto min-h-fit lg:flex-row gap-x-12">
      {servicesInCategory.index % 2 !== 0 && (
        <>
          <div className="relative flex-1 hidden ml-20 lg:block">
            <ParallaxImages sceneClass={`.scene${servicesInCategory.index}`}>
              <div className="absolute ml-52 z-10 min-h-[500px]">
                <Image
                  src={mainPageImages.about1}
                  alt={servicesInCategory.category}
                  height={490}
                  width={370}
                />
              </div>
              <div className="absolute z-20 top-52">
                <Image
                  src={mainPageImages.about2}
                  alt={servicesInCategory.category}
                  height={300}
                  width={300}
                />
              </div>
            </ParallaxImages>
            <div className="absolute -left-36">
              <Image
                src={servicesPageImages.decoration}
                alt="Decorative image"
                height={341}
                width={496}
              />
            </div>
          </div>
          <div className="flex flex-col mx-6 items-center justify-center lg:items-start lg:justify-start lg:flex-1 lg:w-[1200px] gap-y-5">
            <div className="flex items-center justify-center lg:hidden">
              <Image
                src={mainPageImages.about2}
                alt={servicesInCategory.category}
                height={300}
                width={300}
              />
            </div>

            <p className="text-4xl font-semibold lg:text-5xl text-primary">{`0${servicesInCategory.index}. `}</p>
            <h2 className="text-5xl font-medium text-center leading-[48px]">
              {servicesInCategory.category}
            </h2>

            <p className="w-full my-2 text-lg lg:text-start text-center lg:text-xl text-default-500 block min-w-[300px]  md:max-w-[600px]text-pretty">
              {servicesInCategory.description} {servicesInCategory.description}{" "}
              {servicesInCategory.description}
            </p>

            <ul>
              {servicesInCategory.services.map((service) => (
                <li
                  key={service.name}
                  className="flex items-center justify-start gap-x-4"
                >
                  <Icon
                    icon="solar:check-circle-bold"
                    width={22}
                    style={{ color: "#DBB568" }}
                  />{" "}
                  <span className="mt-1 text-xl text-pretty text-default-500">
                    {service.name} - {`(RD$ ${service.price})`}
                  </span>
                </li>
              ))}
            </ul>
          </div>{" "}
        </>
      )}
      {servicesInCategory.index % 2 === 0 && (
        <>
          <div className="flex flex-col mx-6 items-center justify-center lg:items-end lg:justify-end lg:flex-1 lg:w-[1200px] gap-y-5">
            <div className="flex items-center justify-center lg:hidden">
              <Image
                src={mainPageImages.about2}
                alt={servicesInCategory.category}
                height={300}
                width={300}
              />
            </div>

            <p className="text-4xl font-semibold lg:text-5xl text-primary">{`0${servicesInCategory.index}. `}</p>
            <h2 className="text-5xl font-medium text-center leading-[48px]">
              {servicesInCategory.category}
            </h2>

            <p className="w-full my-2 text-lg text-center lg:text-end lg:text-xl text-default-500 block min-w-[300px]  md:max-w-[600px] text-pretty">
              {servicesInCategory.description} {servicesInCategory.description}{" "}
              {servicesInCategory.description}
            </p>

            <ul>
              {servicesInCategory.services.map((service) => (
                <li
                  key={service.name}
                  className="flex items-center justify-end gap-x-4"
                >
                  <span className="mt-1 text-xl text-pretty text-default-500">
                    {`(RD$ ${service.price})`} - {service.name}
                  </span>
                  <Icon
                    icon="solar:check-circle-bold"
                    width={22}
                    style={{ color: "#DBB568" }}
                  />{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex-1 hidden lg:block">
            <ParallaxImages sceneClass={`.scene${servicesInCategory.index}`}>
              <div className="absolute min-h-[500px]">
                <Image
                  src={mainPageImages.about2}
                  alt={servicesInCategory.category}
                  height={490}
                  width={370}
                />
              </div>
              <div className="absolute z-10 ml-52 top-52">
                <Image
                  src={mainPageImages.about1}
                  alt={servicesInCategory.category}
                  height={300}
                  width={300}
                />
              </div>
            </ParallaxImages>
            <div className="absolute -right-16 scale-x-[-1]">
              <Image
                src={servicesPageImages.decoration}
                alt="Decorative image"
                height={341}
                width={496}
              />
            </div>
          </div>
        </>
      )}
    </article>
  );
}
