import { fetchGetRequest } from "@/utils/fetchRequest";

export const ENDPOINT = "product-category";

export const getProductsCategories = async () => {
  const url = `${process.env.SERVER}/${ENDPOINT}`;
  const categories = await fetchGetRequest({ url });
  const result = categories.filter((category: any) =>
    category.status === true ? category : null,
  );
  return result;
};
