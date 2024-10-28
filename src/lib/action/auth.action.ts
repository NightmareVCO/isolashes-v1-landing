"use server";

import { signIn, signOut } from "@lib/auth/auth";
import { fetchPatchRequest } from "@utils/fetchRequest";
import { toTitleCase } from "@utils/toTitleCase";

const handleErrors = (error: any) => {
  const message = error.message;
  if (
    message.includes(
      "user entities failed 'create' check, result is not allowed to be read back",
    )
  ) {
    return { success: "User created successfully" };
  }
  if (message.includes("Unique constraint failed on the fields: (`phone`)")) {
    console.log("phone");
    return {
      error:
        "El número de teléfono ya está en uso. Por favor, intenta con otro.",
    };
  }
  if (message.includes("Unique constraint failed on the fields: (`email`)")) {
    return {
      error:
        "Este correo electrónico ya ha sido registrado. Por favor, intenta con otro.",
    };
  }
  if (message.includes("User already exists")) {
    return {
      error:
        "Este correo electrónico ya ha sido registrado. Por favor, intenta con otro.",
    };
  }
  return { error: `Error creando el usuario` };
};

export const login = async (previousState: any, formData: any) => {
  const { email, password } = Object.fromEntries(formData);
  const lowerCaseEmail = email.toLowerCase().trim();

  try {
    await signIn("credentials", { email: lowerCaseEmail, password });
    return { success: true };
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      (error.message.includes("CredentialsSignin") ||
        error.message.includes("credentialssignin"))
    )
      return { error: "Invalid Credentials" };

    throw error;
  }
};

export const register = async (previousState: any, formData: any) => {
  const { name, lastName, phone, email, birthDate, password } =
    Object.fromEntries(formData);
  const lowerCaseEmail = email.toLowerCase().trim();
  const formattedName = toTitleCase(name.trim());
  const formattedLastName = toTitleCase(lastName.trim());

  const url = `${process.env.SERVER}/auth/signup`;
  const data = {
    name: formattedName,
    lastName: formattedLastName,
    phone,
    birthDate,
    password,
    email: lowerCaseEmail,
  };

  try {
    const response = await fetchPatchRequest({ url, data });
    if (response.status === 500) return handleErrors(response.data);
    if (response.error) return handleErrors(response.data);

    return { success: "Usuario creado exitosamente" };
  } catch (error) {
    return handleErrors(error);
  }
};

export const updateProfile = async (previousState: any, formData: any) => {
  const { name, lastName, phone, email, id } = Object.fromEntries(formData);
  const formattedName = toTitleCase(name.trim());
  const formattedLastName = toTitleCase(lastName.trim());

  const url = `${process.env.SERVER}/auth/user/${id}`;
  const data = {
    name: formattedName,
    lastName: formattedLastName,
    phone,
    email,
  };
  const headers = { "user-id": id };

  try {
    const response = await fetchPatchRequest({ url, headers, data });
    if (response.status === 500) return handleErrors(response.data);
    if (response.error) return handleErrors(response.data);

    return { success: "Usuario actualizado exitosamente" };
  } catch (error) {
    return handleErrors(error);
  }
};

export const loginWithGoogle = async () => {
  await signIn("google");
};

export const logout = async () => {
  await signOut();
};
