import { fetchGetRequest } from "@utils/fetchRequest";

const ENDPOINT = "user/credit-card";

export const getUserCreditCard = async (id: string) => {
  const url = `${process.env.SERVER}/${ENDPOINT}?isString=true`;
  const headers = { "user-id": id };
  return await fetchGetRequest({ url, headers });
};
