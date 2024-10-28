"use client";

import useAccountDetailsForm from "@hooks/useForms/useAccountDetailsForm";
import { accountDetailsFormInfo } from "@infos/userPage/userAccountDetailsForm.info";
import type { CardProps } from "@nextui-org/react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";

type AccountDetailsFormProperties = {
  properties?: CardProps;
  user: any;
};

export default function AccountDetailsForm({
  properties,
  user,
}: AccountDetailsFormProperties) {
  const {
    inputProperties,
    accountDetailsForm,
    updateField,
    isPhoneInvalid,
    formAction,
    state,
    isEmailUnchanged,
    isButtonDisabled,
  } = useAccountDetailsForm({ user });

  return (
    <Card className="p-2" shadow="none" fullWidth {...properties}>
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-6">
        <h3 className="text-large">{accountDetailsFormInfo.title}</h3>
        <Divider className="mb-3" />
        <div className="flex gap-4 py-4">
          <Avatar className="size-14" size="lg" src={user?.image} />

          <div className="flex flex-col items-start justify-center">
            <p className="text-lg font-medium">
              {user?.name} {user?.lastName}
            </p>
            <span className=" text-default-500">{user?.email}</span>
          </div>
        </div>
        <p className="text-small text-default-400">
          {accountDetailsFormInfo.description}
        </p>
      </CardHeader>

      <CardBody className="flex flex-col w-full">
        <form
          id="formUpdateUser"
          action={formAction}
          className="flex flex-col w-full gap-y-6 lg:gap-y-14"
        >
          <input type="hidden" readOnly name="id" value={user?.id} />
          <div className="flex flex-col w-full gap-6 lg:flex-row">
            <Input
              radius="none"
              size="lg"
              label="Nombre"
              name="name"
              type="string"
              placeholder="Escribe tu nombre aquí"
              maxLength={50}
              isRequired
              value={accountDetailsForm.name}
              onChange={(event) => {
                updateField("name", event.currentTarget.value);
              }}
              {...inputProperties}
            />
            <Input
              radius="none"
              size="lg"
              label="Apellido"
              name="lastName"
              type="string"
              placeholder="Escribe tu apellido aquí"
              maxLength={50}
              isRequired
              value={accountDetailsForm.lastName}
              onChange={(event) => {
                updateField("lastName", event.currentTarget.value);
              }}
              {...inputProperties}
            />
          </div>

          <div className="flex flex-col w-full gap-6 lg:flex-row">
            <Input
              radius="none"
              size="lg"
              label="Email"
              name="email"
              type="email"
              placeholder="ejemplo@gmail.com"
              maxLength={50}
              isRequired
              isDisabled={isEmailUnchanged}
              errorMessage="El email no es válido, debe contener un @ y un dominio válido"
              value={accountDetailsForm.email}
              onChange={(event) => {
                updateField("email", event.currentTarget.value);
              }}
              {...inputProperties}
            />
            <Input
              radius="none"
              size="lg"
              label="Número de teléfono"
              name="phone"
              type="tel"
              placeholder="Escribe tu número aquí"
              maxLength={20}
              isRequired
              value={accountDetailsForm.phone}
              onChange={(event) => {
                updateField(
                  "phone",
                  event.currentTarget.value.replaceAll(/\D/g, ""),
                );
              }}
              isInvalid={isPhoneInvalid}
              errorMessage="El número de teléfono no es válido, debe contener al menos 10 dígitos"
              {...inputProperties}
            />
          </div>

          <div className="lg:hidden">
            {state?.error && (
              <p className="text-center text-red-500 text-medium">
                {state?.error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-x-5 ">
            <div className="hidden lg:block">
              {state?.error && (
                <p className="text-center text-red-500 text-medium">
                  {state?.error}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between gap-x-5">
              {/* CANCEL */}
              <Button radius="none" variant="bordered">
                {accountDetailsFormInfo.cancelButton}
              </Button>
              {/* SAVE */}
              <Button
                isDisabled={isButtonDisabled}
                radius="none"
                type="submit"
                color="primary"
              >
                {accountDetailsFormInfo.saveButton}
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
