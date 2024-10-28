import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";

export default function Newsletter() {
  return (
    <section className="p-4 my-10 bg-default-200/20 sm:my-14 sm:p-8 lg:my-16 lg:flex lg:items-center lg:justify-between lg:gap-2">
      <div>
        <h3 className="font-semibold text-small text-default-600">
          Suscribete para recibir noticias, ofertas y promociones
        </h3>
        <p className="mt-2 text-small text-default-400">
          Recibe las últimas noticias y ofertas especiales directamente en tu
          bandeja de entrada de correo electrónico.
        </p>
      </div>
      <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
        <Input
          radius="none"
          isRequired
          aria-label="Email"
          autoComplete="email"
          id="email-address"
          labelPlacement="outside"
          name="email-address"
          placeholder="tuemail@email.com"
          startContent={
            <Icon className="text-default-500" icon="solar:letter-linear" />
          }
          type="email"
        />
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
          <Button radius="none" color="primary" type="submit">
            Suscribete
          </Button>
        </div>
      </form>
    </section>
  );
}
