import { aboutUsHeroSectionInfo } from "@infos/aboutUsPage/aboutUsHeroSection.info";
import SimpleHeroSection from "@ui/simpleHero/SimpleHeroSection";

export default function ServicesHeroSection() {
  return (
    <section>
      <SimpleHeroSection {...aboutUsHeroSectionInfo} />
    </section>
  );
}
