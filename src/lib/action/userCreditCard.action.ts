"use server";

import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";

export const createUserCreditCard = async (
  previousState: any,
  formData: any,
) => {
  const { id, number, expiration, cvv, name, lastName } =
    Object.fromEntries(formData);

  const data = {
    number,
    expiration,
    cvv,
    name,
    lastName,
  };

  const endpoint = "user/credit-card";
  const headers = { "user-id": id };
  return await fetchPostRequest({
    url: `${process.env.SERVER}/${endpoint}`,
    headers,
    data,
  });
};

export const updateUserCreditCard = async (
  previousState: any,
  formData: any,
) => {
  const { cardId, id, number, expiration, cvv, name, lastName } =
    Object.fromEntries(formData);

  const data = {
    number,
    expiration,
    cvv,
    name,
    lastName,
  };

  const endpoint = `user/credit-card/${cardId}`;
  const headers = { "user-id": id };
  return await fetchPatchRequest({
    url: `${process.env.SERVER}/${endpoint}`,
    headers,
    data,
  });
};

export const deleteUserCreditCard = async (
  previousState: any,
  formData: any,
) => {
  const { id, cardId } = Object.fromEntries(formData);

  const endpoint = `user/credit-card/${cardId}`;
  const headers = { "user-id": id };
  return await fetchDeleteRequest({
    url: `${process.env.SERVER}/${endpoint}`,
    headers,
  });
};
