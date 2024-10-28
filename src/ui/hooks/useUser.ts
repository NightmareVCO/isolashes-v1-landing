import { getUser } from "@data/auth.data";
import { getSessionUser } from "@data/auth.data";

export default async function useUser() {
  const sessionUser = await getSessionUser();
  const user = await getUser(sessionUser?.id || "");

  user.image = sessionUser?.image;

  return {
    user,
  };
}
