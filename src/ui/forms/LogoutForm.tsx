import { logout } from "@action/auth.action";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <button type="submit">Cerrar Sesión</button>
    </form>
  );
}
