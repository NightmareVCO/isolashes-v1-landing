import { getProducts } from "@data/products.data";
import { getProductsCategories } from "@data/productsCategories.data";

export async function useStoreProducts({ searchParams }: any) {
  const category = searchParams?.category || "";
  const status = searchParams?.status || "";
  const orderBy = searchParams?.orderBy || "";
  const query = searchParams?.query || "";

  const products = await getProducts({
    order: orderBy === "" ? "createdAt" : "price",
    orderDirection:
      orderBy === "" ? "asc" : orderBy === "Precio Menor" ? "asc" : "desc",
    cursor: "",
    status: status === "" ? "" : status,
    where: category === "" ? "" : "productCategory",
    whereValue: category === "" ? "" : category,
    query: query === "" ? "" : query,
  });

  const productsCategoriesSlots = await getProductsCategories();

  return {
    products,
    productsCategoriesSlots,
    selectedCategory: category,
    selectedStatus: status,
    selectedOrderBy: orderBy,
  };
}
