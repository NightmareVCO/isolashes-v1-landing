import { buildUrl } from "@utils/buidlUrl";
import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "products";

type getProductsParameters = {
  order: string;
  orderDirection: string;
  takeValue?: number;
  skipValue?: number;
  cursor: string;
  status: string;
  where: string;
  whereValue: string;
  query: string;
};

export const getProducts = async (parameters: getProductsParameters) => {
  const endpoint = ENDPOINT;
  const url = buildUrl({ parameters, endpoint });
  const products = await fetchGetRequest({ url, noStore: true });
  const result = {
    ...products,
    products: products.products.filter(
      (product: any) => product.status === true,
    ),
  };
  return result;
};

export const getProductsActive = async (parameters: getProductsParameters) => {
  const endpoint = `${ENDPOINT}/actives`;
  const url = buildUrl({ parameters, endpoint });
  return await fetchGetRequest({ url, noStore: true });
};

export const getProductById = async (id: string) => {
  const url = `${process.env.SERVER}/${ENDPOINT}/${id}`;
  return await fetchGetRequest({ url, noStore: true });
};
