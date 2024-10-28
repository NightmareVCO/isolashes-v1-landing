import { fetchGetRequest } from "@utils/fetchRequest";

const ENDPOINT = "shopping-cart";

export const getUserCart = async ({ userId, cartId }: any) => {
  const url = `${process.env.SERVER}/${ENDPOINT}/${cartId}/total-price-per-item-and-total-price`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers, noStore: true });
};
