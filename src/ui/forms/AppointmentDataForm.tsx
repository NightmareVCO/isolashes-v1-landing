"use client";

import useAppointmentDataForm from "@hooks/useForms/useAppointmentDataForm";
import { Checkbox, Input } from "@nextui-org/react";
import { FormData } from "@type/appointmentForm.types";
import { cn } from "@utils/cn";
import Link from "next/link";
import React from "react";

export type AppointmentDataForm = React.HTMLAttributes<HTMLFormElement> & {
  formData: FormData;
  updateFieldData: (field: string, value: string) => void;
  user: any;
};
import { appointmentDataFormInfo } from "@infos/appointmentPage/appointmentDataForm.info";

const AppointmentDataForm = React.forwardRef<
  HTMLFormElement,
  AppointmentDataForm
>(
  (
    { className, formData, user, updateFieldData, ...properties },
    reference,
  ) => {
    const {
      isEmailInvalid,
      isConfirmEmailInvalid,
      isPhoneInvalid,
      inputProperties,
    } = useAppointmentDataForm(formData);

    return (
      <section>
        <div className="text-4xl font-semibold leading-9 text-default-foreground">
          {appointmentDataFormInfo.title}
        </div>

        {!user && (
          <div className="py-2 text-medium text-default-500">
            {appointmentDataFormInfo.subtitle}
            <Link className="ml-2 underline text-secondary" href="/login">
              {appointmentDataFormInfo.link}
            </Link>
          </div>
        )}
        <form
          ref={reference}
          {...properties}
          className={cn(
            "flex grid grid-cols-12 flex-col gap-4 gap-y-7 py-8",
            className,
          )}
        >
          <Input
            className="col-span-12 md:col-span-6"
            radius="none"
            size="lg"
            label="Nombre"
            name="name"
            type="string"
            placeholder="Escribe tu nombre aquí"
            maxLength={30}
            isRequired
            value={formData.name}
            onChange={(event) => {
              updateFieldData("name", event.currentTarget.value);
            }}
            {...inputProperties}
          />

          <Input
            className="col-span-12 md:col-span-6"
            radius="none"
            size="lg"
            label="Apellido"
            name="lastName"
            type="text"
            placeholder="Escribe tu apellido aquí"
            maxLength={30}
            isRequired
            value={formData.lastName}
            onChange={(event) => {
              updateFieldData("lastName", event.currentTarget.value);
            }}
            {...inputProperties}
          />

          <Input
            className="col-span-12 md:col-span-6"
            radius="none"
            size="lg"
            label="Email"
            name="email"
            type="email"
            placeholder="ejemplo@gmail.com"
            maxLength={50}
            isRequired
            errorMessage="El email no es válido, debe contener un @ y un dominio válido"
            value={formData.email}
            onChange={(event) => {
              updateFieldData("email", event.currentTarget.value);
            }}
            {...inputProperties}
            isInvalid={isEmailInvalid}
          />

          <Input
            className="col-span-12 md:col-span-6"
            radius="none"
            size="lg"
            label="Confirmar Email"
            name="confirm-email"
            type="email"
            placeholder="ejemplo@gmail.com"
            maxLength={50}
            isRequired
            errorMessage="El email no coincide"
            value={formData.confirmEmail}
            onChange={(event) => {
              updateFieldData("confirmEmail", event.currentTarget.value);
            }}
            isInvalid={isConfirmEmailInvalid}
            {...inputProperties}
          />

          <Input
            className="col-span-12 md:col-span-6"
            radius="none"
            size="lg"
            label="Número de teléfono"
            name="phone"
            type="tel"
            placeholder="Escribe tu número aquí"
            maxLength={20}
            isRequired
            value={formData.phone}
            onChange={(event) => {
              updateFieldData(
                "phone",
                event.currentTarget.value.replaceAll(/\D/g, ""),
              );
            }}
            isInvalid={isPhoneInvalid}
            errorMessage="El número de teléfono no es válido, debe contener al menos 10 dígitos"
            {...inputProperties}
          />

          {!user && (
            <Checkbox
              defaultSelected
              radius="none"
              className="col-span-12 p-1 m-0 text-left"
              size="lg"
              color="secondary"
              name="terms"
            >
              {appointmentDataFormInfo.checkboxText}
            </Checkbox>
          )}
        </form>
      </section>
    );
  },
);

AppointmentDataForm.displayName = appointmentDataFormInfo.displayName;

export default AppointmentDataForm;
