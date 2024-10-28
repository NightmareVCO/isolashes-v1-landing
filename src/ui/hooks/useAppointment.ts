import { getUser } from "@data/auth.data";
import { getSessionUser } from "@data/auth.data";

export default async function useAppointment() {
  const sessionUser = await getSessionUser();
  const user = await getUser(sessionUser?.id || "");

  return {
    user,
  };
}
