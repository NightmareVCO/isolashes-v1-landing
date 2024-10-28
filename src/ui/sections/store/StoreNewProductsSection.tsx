import { getProductsActive } from "@data/products.data";
import { newProducts } from "@infos/storePage/newProducts";
import StyledSideHeading from "@ui/heading/StyledSideHeadings";
import ProductList from "@ui/products/ProductList";

type StoreNewProductsSectionProperties = {
  maxItem: number;
  user: any;
};

export default async function StoreNewProductsSection({
  maxItem,
  user,
}: StoreNewProductsSectionProperties) {
  const products = await getProductsActive({
    order: "createdAt",
    orderDirection: "asc",
    takeValue: maxItem,
    skipValue: 0,
    cursor: "",
    status: "Nuevos",
    where: "isNew",
    whereValue: "true",
    query: "",
  });

  return (
    <div className="px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <StyledSideHeading
        normalText={newProducts.normalText}
        styledText={newProducts.styledText}
      />
      {products.products.length > 0 && (
        <ProductList products={products} user={user} />
      )}
    </div>
  );
}
