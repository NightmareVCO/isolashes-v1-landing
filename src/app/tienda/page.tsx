import { storeConfig } from "@config/site";
import { getSessionUser } from "@data/auth.data";
import StoreCategorySection from "@sections/store/StoreCategorySection";
import StoreNewProductsSection from "@sections/store/StoreNewProductsSection";
import StoreProductSection from "@sections/store/StoreProductsSection";
import Slider from "@ui/slider/Slider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: storeConfig.title,
  description: storeConfig.description,
};

export default async function Shop() {
  const user = await getSessionUser();

  return (
    <section className="flex flex-col gap-y-24">
      <Slider />
      <StoreProductSection maxItems={4} user={user} />
      <StoreCategorySection />
      <StoreNewProductsSection maxItem={4} user={user} />
    </section>
  );
}
