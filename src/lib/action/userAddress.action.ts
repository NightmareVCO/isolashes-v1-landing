"use server";

import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { revalidatePath } from "next/cache";

export const createUserAddress = async (previousState: any, formData: any) => {
  const { id, country, state, city, street, number, zipCode } =
    Object.fromEntries(formData);

  const data = {
    country,
    state,
    city,
    street,
    number,
    zipCode,
  };

  const endpoint = "user/address";
  const headers = { "user-id": id };
  await fetchPostRequest({
    url: `${process.env.SERVER}/${endpoint}`,
    headers,
    data,
  });
  revalidatePath("/usuario?tab=direcciones");
};

export const updateUserAddress = async (previousState: any, formData: any) => {
  const { addressId, id, country, state, city, street, number, zipCode } =
    Object.fromEntries(formData);

  const data = {
    country,
    state,
    city,
    street,
    number,
    zipCode,
  };

  const endpoint = `user/address/${addressId}`;
  const headers = { "user-id": id };
  await fetchPatchRequest({
    url: `${process.env.SERVER}/${endpoint}`,
    headers,
    data,
  });
  revalidatePath("/usuario?tab=direcciones");
};

export const deleteUserAddress = async (previousState: any, formData: any) => {
  const { id, addressId } = Object.fromEntries(formData);

  const endpoint = `user/address/${addressId}`;
  const headers = { "user-id": id };
  await fetchDeleteRequest({
    url: `${process.env.SERVER}/${endpoint}`,
    headers,
  });
  revalidatePath("/usuario?tab=direcciones");
};
