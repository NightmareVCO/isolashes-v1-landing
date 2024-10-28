import { contactConfig } from "@config/site";
import { getProducts } from "@data/products.data";
import ContactHeroSection from "@sections/contact/ContactHeroSection";
import ContactMainSection from "@sections/contact/ContactMainSection";
import StyledSideHeading from "@ui/heading/StyledSideHeadings";
import Location from "@ui/map/Map";
import ScrollImages from "@ui/scrollImages/ScrollImages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: contactConfig.title,
  description: contactConfig.description,
};

export default async function Contact() {
  const products = await getProducts({
    order: "createdAt",
    orderDirection: "desc",
    takeValue: 15,
    skipValue: 0,
    cursor: "",
    status: "true",
    where: "",
    query: "",
    whereValue: "",
  });

  return (
    <section className="flex flex-col gap-y-20">
      <ContactHeroSection />
      <ContactMainSection />
      <StyledSideHeading normalText="COMO" styledText="LLEGAR" />
      <Location />
      <ScrollImages products={products} />
    </section>
  );
}
