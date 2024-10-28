import { getProductsActive } from "@data/products.data";
import { allProductsInfo } from "@infos/storePage/allProducts.info";
import StyledButton from "@ui/buttons/StyledButton";
import StyledSideHeading from "@ui/heading/StyledSideHeadings";
import ProductList from "@ui/products/ProductList";

type StoreProductSectionProperties = {
  maxItems: number;
  user?: any;
};

export default async function StoreProductSection({
  maxItems,
  user,
}: StoreProductSectionProperties) {
  const products = await getProductsActive({
    order: "createdAt",
    orderDirection: "asc",
    takeValue: maxItems,
    skipValue: 0,
    cursor: "",
    status: "true",
    where: "isNew",
    whereValue: "false",
    query: "",
  });

  return (
    <div className="px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <StyledSideHeading
        normalText={allProductsInfo.normalText}
        styledText={allProductsInfo.styledText}
      />
      <ProductList products={products} user={user} />
      <div className="flex items-center justify-center mt-14">
        <StyledButton className="text-white" href={allProductsInfo.buttonHref}>
          {allProductsInfo.buttonText}
        </StyledButton>
      </div>
    </div>
  );
}
