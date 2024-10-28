import { servicesConfig } from "@config/site";
import { getSessionUser } from "@data/auth.data";
import { getServicesInCategory } from "@data/service.data";
import AppointmentSection from "@sections/homepage/AppointmentSection";
import ServicesCategorySection, {
  ServicesCategorySectionProperties,
} from "@sections/services/ServicesCaterorySection";
import ServicesHeroSection from "@sections/services/ServicesHeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: servicesConfig.title,
  description: servicesConfig.description,
};

export default async function Services() {
  const user = await getSessionUser();
  const servicesInCategory = await getServicesInCategory();
  console.log(servicesInCategory);

  return (
    <section className="flex flex-col lg:gap-y-40 gap-y-20">
      <ServicesHeroSection />
      {servicesInCategory?.length > 0 &&
        servicesInCategory.map(
          (category: ServicesCategorySectionProperties, index: number) => (
            <ServicesCategorySection
              key={index}
              {...category}
              index={index + 1}
            />
          ),
        )}
      <AppointmentSection user={user} />;
    </section>
  );
}
