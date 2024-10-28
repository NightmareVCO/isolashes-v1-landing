import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "services";

export type ServicesProperties = {
  id: string;
  name: string;
  description?: string;
};

export const getServices = async () => {
  const url = `${process.env.SERVER}/services`;
  return await fetchGetRequest({ url });
};

export const getServiceByName = async (name: string) => {
  const url = `${process.env.SERVER}/${ENDPOINT}/name/${name}`;
  return await fetchGetRequest({ url });
};

export const getAllServicesForSelect = async () => {
  let initialServices: ServicesProperties[] = [
    {
      id: "0",
      name: "--Seleccionar un servicio--",
    },
  ];

  const url = `${process.env.SERVER}/services`;
  const response = await fetchGetRequest({ url });
  initialServices = [...initialServices, ...response];
  return initialServices;
};

export const getServicesForSelect = async (serviceCategory: string) => {
  let initialServices: ServicesProperties[] = [
    {
      id: "0",
      name: "--Seleccionar un servicio--",
    },
  ];

  const url = `${process.env.SERVER}/${ENDPOINT}?where=serviceCategory&whereValue=${serviceCategory}`;
  const services = await fetchGetRequest({ url });
  const response = services.filter((service: any) => service.status === true);
  initialServices = [...initialServices, ...response];
  return initialServices;
};

export const getServicesInCategory = async () => {
  const url = `${process.env.SERVER}/${ENDPOINT}/in-category`;
  return await fetchGetRequest({ url });
};
