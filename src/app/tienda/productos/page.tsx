import { productsConfig } from "@config/site";
import { getSessionUser } from "@data/auth.data";
import { useStoreProducts } from "@hooks/useStoreProducts";
import { Card, CardHeader } from "@nextui-org/react";
import ProductsFilters from "@ui/filters/ProductsFilters";
import StyledSideHeading from "@ui/heading/StyledSideHeadings";
import ProductList from "@ui/products/ProductList";
import StoreHeroSection from "@ui/sections/store/StoreHeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: productsConfig.title,
  description: productsConfig.description,
};

export default async function StoreProducts({ searchParams }: any) {
  const {
    products,
    productsCategoriesSlots,
    selectedCategory,
    selectedStatus,
    selectedOrderBy,
  } = await useStoreProducts({
    searchParams,
  });

  console.log(products);

  const user = await getSessionUser();
  return (
    <section className="flex flex-col gap-y-24">
      <StoreHeroSection />
      <div className="px-6 mt-16 lg:mt-0 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <StyledSideHeading
          className="mb-8"
          normalText="TODOS"
          styledText="NUESTROS PRODUCTOS"
        />
        <Card shadow="none" radius="none" fullWidth className="hidden lg:flex">
          <CardHeader className="flex items-center justify-center gap-x-5 ">
            <ProductsFilters
              productsCategoriesSlots={productsCategoriesSlots}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              selectedOrderBy={selectedOrderBy}
            />
          </CardHeader>
        </Card>
        <ProductList products={products} user={user} />
      </div>
    </section>
  );
}
