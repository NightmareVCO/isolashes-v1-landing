import { buildUrl } from "@utils/buidlUrl";
import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "appointments";

type getAppointmentsParameters = {
  id: string;
  order: string;
  orderDirection: string;
  takeValue: number;
  skipValue: number;
  cursor: string;
  status: string;
  branch?: any;
  service?: any;
  hour?: any;
  date: any;
};

export const getAppointments = async (
  parameters: getAppointmentsParameters,
) => {
  const endpoint = ENDPOINT;
  const url = buildUrl({ parameters, endpoint });
  const headers = { "user-id": `${parameters.id}` };

  return fetchGetRequest({ url, headers });
};

export const getUrlToFetch = async (parameters: getAppointmentsParameters) => {
  const endpoint = ENDPOINT;
  return buildUrl({ parameters, endpoint });
};
