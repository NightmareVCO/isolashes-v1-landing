import { fetchGetRequest } from "@/utils/fetchRequest";

export const ENDPOINT = "hours";

export type HoursProperties = {
  id: string;
  time: string;
};

export const getHourByName = async (name: string) => {
  const url = `${process.env.SERVER}/${ENDPOINT}/name/${name}`;
  return await fetchGetRequest({ url });
};

export const getHours = async () => {
  const url = `${process.env.SERVER}/${ENDPOINT}`;
  return await fetchGetRequest({ url });
};
