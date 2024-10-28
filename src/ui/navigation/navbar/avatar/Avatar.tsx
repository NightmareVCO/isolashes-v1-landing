"use client";

import { Icon } from "@iconify/react";
import {
  Avatar as NextUIAvatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export default function Avatar({ user }: any) {
  return (
    <Dropdown radius="none" placement="bottom-end">
      <DropdownTrigger>
        <NextUIAvatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name={user?.name}
          size="md"
          src={user?.image}
          icon={user?.image ? "" : <AvatarIcon />}
          classNames={{
            base: "hover:scale-105",
            icon: "text-secondary",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="flat">
        {user && (
          <DropdownItem
            key="perfil"
            href="/usuario?tab=usuario"
            className="gap-2 h-14"
          >
            <p className="font-semibold">
              {user.name} {user.lastName}
            </p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
        )}
        {user && (
          <DropdownItem
            classNames={{
              base: "hover:rounded-none",
            }}
            href="/usuario?tab=usuario"
            key="usuario"
          >
            Usuario
          </DropdownItem>
        )}
        {user && (
          <DropdownItem href="/usuario?tab=citas&pagina=1" key="citas">
            Citas
          </DropdownItem>
        )}
        {user && (
          <DropdownItem href="/usuario?tab=ordenes" key="ordenes">
            Ordenes
          </DropdownItem>
        )}
        {user && (
          <DropdownItem href="/carrito" key="carrito">
            Carrito
          </DropdownItem>
        )}
        {user && (
          <DropdownItem
            key="cursos"
            className="text-warning"
            color="warning"
            href="https://academia.isolashes.com/usuario/cursos"
            endContent={
              <Icon
                icon="solar:arrow-right-up-line-duotone"
                height={23}
                width={23}
              />
            }
          >
            Cursos
          </DropdownItem>
        )}
        {user && user.roles.includes("ADMIN") && (
          <DropdownItem
            key="dashboard"
            className="text-warning"
            color="warning"
            href="https://dashboard.isolashes.com/"
            endContent={
              <Icon
                icon="solar:arrow-right-up-line-duotone"
                height={23}
                width={23}
              />
            }
          >
            Dashboard
          </DropdownItem>
        )}
        {!user && (
          <DropdownItem
            href="/login"
            key="login"
            className="text-success"
            color="success"
          >
            Iniciar Sesión
          </DropdownItem>
        )}
        {!user && (
          <DropdownItem
            href="/signup"
            key="signup"
            className="text-success"
            color="success"
          >
            Crear Cuenta
          </DropdownItem>
        )}
        {user && (
          <DropdownItem
            href="/logout"
            key="delete"
            className="text-danger"
            color="danger"
          >
            {/* <LogoutForm /> */}
            Cerrar Sesión
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
