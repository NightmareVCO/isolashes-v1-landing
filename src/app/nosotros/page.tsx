import { aboutConfig } from "@config/site";
import { getProducts } from "@data/products.data";
import { frequentlyQuestionSectionInfo } from "@infos/aboutUsPage/aboutFrequentlyQuestionSection.info";
import AboutPerksSection from "@sections/aboutUs/AboutPerksSection";
import AboutUsHeroSection from "@sections/aboutUs/AboutUsHeroSection";
import AboutUsHistorySection from "@sections/aboutUs/AboutUsHistorySection";
import AboutUsStoreBanner from "@sections/aboutUs/AboutUsStoreBanner";
import AboutSection from "@sections/homepage/AboutSection";
import FrequentlyQuestions from "@ui/frequentlyQuestions/FrequentlyQuestions";
import ScrollImages from "@ui/scrollImages/ScrollImages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: aboutConfig.title,
  description: aboutConfig.description,
};

export default async function AboutUs() {
  const products = await getProducts({
    order: "createdAt",
    orderDirection: "desc",
    takeValue: 15,
    skipValue: 0,
    cursor: "",
    status: "true",
    where: "",
    whereValue: "",
    query: "",
  });

  return (
    <section className="flex flex-col gap-y-20 lg:gap-y-52">
      <AboutUsHeroSection />
      <AboutSection />
      <div className="pt-40">
        <AboutUsHistorySection />
      </div>
      <FrequentlyQuestions questions={frequentlyQuestionSectionInfo} />
      <div className="flex flex-col gap-y-20">
        <AboutUsStoreBanner />
        <AboutPerksSection />
        <ScrollImages products={products.products} />
      </div>
    </section>
  );
}
