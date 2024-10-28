import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "service-category";

export type ServicesCategoriesProperties = {
  id: string;
  name: string;
  description?: string;
};

export const getServicesCategoriesForSelect = async () => {
  let initialServices: ServicesCategoriesProperties[] = [
    {
      id: "0",
      name: "--Seleccionar una categoría--",
    },
  ];

  const url = `${process.env.SERVER}/${ENDPOINT}`;
  const response = await fetchGetRequest({ url });
  const result = response.filter((status: any) =>
    status.status === true ? status : null,
  );
  initialServices = [...initialServices, ...result];
  return initialServices;
};

export const getServicesCategories = async () => {
  const url = `${process.env.SERVER}/${ENDPOINT}`;
  return await fetchGetRequest({ url });
};
