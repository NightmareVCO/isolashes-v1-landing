import { getProductsCategories } from "@data/productsCategories.data";
import { categoryProducts } from "@infos/storePage/categoryProducts";
import StyledSideHeading from "@ui/heading/StyledSideHeadings";
import CategoryList from "@ui/products/CategoryList";

export default async function StoreCategorySection() {
  const categories = await getProductsCategories();

  return (
    <div className="px-3">
      <StyledSideHeading
        normalText={categoryProducts.normalText}
        styledText={categoryProducts.styledText}
      />
      <CategoryList categories={categories} />
    </div>
  );
}
