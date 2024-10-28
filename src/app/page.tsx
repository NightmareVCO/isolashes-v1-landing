import { getSessionUser } from "@data/auth.data";
import { getProductsActive } from "@data/products.data";
import AboutSection from "@sections/homepage/AboutSection";
import AppointmentSection from "@sections/homepage/AppointmentSection";
import HeroSection from "@sections/homepage/HeroSection";
import ProductsSection from "@sections/homepage/ProductsSection";
import ServicesSection from "@sections/homepage/ServicesSection";
import TeamSection from "@sections/homepage/TeamSection";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const user = await getSessionUser();
  revalidatePath("/", "page");
  const products = await getProductsActive({
    order: "createdAt",
    orderDirection: "asc",
    takeValue: 4,
    skipValue: 0,
    cursor: "",
    status: "true",
    where: "",
    whereValue: "",
    query: "",
  });

  return (
    <section className="flex flex-col gap-y-52">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection products={products} user={user} />
      <TeamSection />
      <AppointmentSection user={user} />
    </section>
  );
}
