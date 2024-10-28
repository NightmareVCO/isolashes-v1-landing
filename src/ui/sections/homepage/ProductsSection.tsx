"use client";

import { productsInfo } from "@infos/mainPage/products.info";
import StyledHeading from "@ui/heading/StyledHeading";
import ProductList from "@ui/products/ProductList";

import StyledButton from "@/ui/buttons/StyledButton";

type ProductsSectionProperties = {
  products: any[];
  user: any;
};

export default function ProductsSection({
  products,
  user,
}: ProductsSectionProperties) {
  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <StyledHeading
        normalText={productsInfo.normalText}
        styledText={productsInfo.styledText}
      />
      <ProductList products={products} user={user} />
      <div className="flex items-center justify-center mt-14">
        <StyledButton className="text-white" href={productsInfo.buttonHref}>
          {productsInfo.buttonText}
        </StyledButton>
      </div>
    </section>
  );
}
