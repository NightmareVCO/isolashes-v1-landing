import { servicesHeroSectionInfo } from "@infos/servicesPage/servicesHeroSection.info";
import SimpleHeroSection from "@ui/simpleHero/SimpleHeroSection";

export default function ServicesHeroSection() {
  return (
    <section>
      <SimpleHeroSection {...servicesHeroSectionInfo} />
    </section>
  );
}
