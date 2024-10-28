import { auth } from "@lib/auth/auth";
import { fetchGetRequest } from "@utils/fetchRequest";

export const getUser = async (id: string) => {
  const url = `${process.env.SERVER}/auth/user/${id}`;
  return await fetchGetRequest({ url });
};

export const getSessionUser = async () => {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;

  return session.user;
};
