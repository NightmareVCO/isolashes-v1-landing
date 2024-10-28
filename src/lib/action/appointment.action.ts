"use server";

import { fetchPostRequest } from "@utils/fetchRequest";
import { revalidatePath } from "next/cache";

const handleErrors = (error: any) => {
  const message = error.message;
  if (
    message.includes(
      "appointment entities failed 'create' check, result is not allowed to be read back",
    )
  ) {
    return { success: "User created successfully" };
  }
  return { error: `Error creando la cita: ${error.message}` };
};

export const createAppointment = async (previousState: any, formData: any) => {
  const {
    id,
    cardNumber,
    cvc,
    cardName,
    cardLastName,
    cardAddress,
    sector,
    country,
    city,
    termsPayment,
    cardMonth,
    cardYear,
    branch,
    service,
    date,
    hours,
    email,
    name,
    lastName,
    phone,
  } = Object.fromEntries(formData);
  const fullName = `${name} ${lastName}`;

  const data = {
    id,
    cardNumber,
    cvc,
    cardName,
    cardLastName,
    cardAddress,
    sector,
    country,
    city,
    termsPayment,
    cardMonth,
    cardYear,
    branch,
    service,
    date,
    hours,
    email,
    fullName,
    phone,
  };

  const url = `${process.env.SERVER}/appointments`;
  const headers = { "user-id": data.id };

  try {
    const response = await fetchPostRequest({ url, headers, data });
    if (response.status === 500) return handleErrors(response.data);
    if (response.error) return handleErrors(response.data);

    revalidatePath("/user");
    console.log("Cita creada exitosamente");
    return { success: "Cita creada exitosamente" };
  } catch (error) {
    return handleErrors(error);
  }
};
