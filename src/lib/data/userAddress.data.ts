import { fetchGetRequest } from "@utils/fetchRequest";

const ENDPOINT = "user/address";

export const getUserAddress = async (id: string) => {
  const url = `${process.env.SERVER}/${ENDPOINT}?isString=true`;
  const headers = { "user-id": id };
  return await fetchGetRequest({ url, headers, noStore: true });
};
