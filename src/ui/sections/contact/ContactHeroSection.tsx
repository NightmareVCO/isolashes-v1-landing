import { contactHeroSectionInfo } from "@infos/contactPage/contactHeroSection.info";
import SimpleHeroSection from "@ui/simpleHero/SimpleHeroSection";

export default function ContactHeroSection() {
  return (
    <section>
      <SimpleHeroSection {...contactHeroSectionInfo} />
    </section>
  );
}
