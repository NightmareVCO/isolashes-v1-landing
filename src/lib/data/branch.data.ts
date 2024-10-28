import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "branches";

export type BranchesProperties = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
};

export const getBranchByName = async (name: string) => {
  const url = `${process.env.SERVER}/${ENDPOINT}/name/${name}`;
  return await fetchGetRequest({ url });
};

export const getBranchesForSelect = async () => {
  let initialBranches: BranchesProperties[] = [
    {
      id: "0",
      name: "--Seleccionar una sucursal--",
    },
  ];

  const url = `${process.env.SERVER}/${ENDPOINT}`;
  const branches = await fetchGetRequest({ url });
  const result = branches.filter((branch: any) => branch.status === true);
  initialBranches = [...initialBranches, ...result];
  return initialBranches;
};

export const getBranches = async () => {
  const url = `${process.env.SERVER}/${ENDPOINT}`;
  return await fetchGetRequest({ url });
};
