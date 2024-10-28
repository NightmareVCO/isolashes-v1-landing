"use client";

import useSignupForm from "@hooks/useForms/useSignupForm";
import { Icon } from "@iconify/react";
import { signupInfo } from "@infos/authPage/signup.info";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Input,
} from "@nextui-org/react";
import GoogleLoginButton from "@ui/buttons/GoogleLoginButton";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function SignupForm() {
  const {
    formAction,
    isVisible,
    toggleVisibility,
    state,
    signUpForm,
    updateField,
    inputProperties,
    isPhoneInvalid,
    datePickerProperties,
    isPasswordInvalid,
  } = useSignupForm();

  return (
    <div className="flex items-center justify-center w-full bg-background">
      <div className="flex flex-col items-center w-full max-w-xl gap-4 p-4">
        <div className="w-full text-center">
          <p className="text-4xl font-semibold leading-9 text-default-foreground">
            {signupInfo.title}
          </p>
          <p className="text-xl text-default-500">{signupInfo.description}</p>
        </div>

        <Toaster position="top-center" reverseOrder={false} />
        <GoogleLoginButton />

        <div className="flex items-center w-full gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">Ó</p>
          <Divider className="flex-1" />
        </div>

        <form className="flex flex-col w-full gap-y-5" action={formAction}>
          <div className="flex flex-row w-full gap-x-6">
            <Input
              radius="none"
              size="lg"
              label="Nombre"
              name="name"
              type="string"
              placeholder="Escribe tu nombre aquí"
              maxLength={50}
              isRequired
              value={signUpForm.name}
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
              value={signUpForm.lastName}
              onChange={(event) => {
                updateField("lastName", event.currentTarget.value);
              }}
              {...inputProperties}
            />
          </div>
          <div className="flex flex-row w-full gap-x-6">
            <Input
              radius="none"
              size="lg"
              label="Email"
              name="email"
              type="email"
              placeholder="ejemplo@gmail.com"
              maxLength={50}
              isRequired
              errorMessage="El email no es válido, debe contener un @ y un dominio válido"
              value={signUpForm.email}
              onChange={(event) => {
                updateField("email", event.currentTarget.value);
              }}
              {...inputProperties}
            />
            <Input
              radius="none"
              size="lg"
              label="Contraseña"
              name="password"
              type={isVisible ? "text" : "password"}
              placeholder="Escribe tu contraseña"
              isRequired
              errorMessage="La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un carácter especial"
              value={signUpForm.password}
              onChange={(event) => {
                updateField("password", event.currentTarget.value);
              }}
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="text-2xl pointer-events-none text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="text-2xl pointer-events-none text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              isInvalid={isPasswordInvalid}
              {...inputProperties}
            />
          </div>
          <div className="flex flex-row w-full gap-x-6">
            <Input
              radius="none"
              size="lg"
              label="Número de teléfono"
              name="phone"
              type="tel"
              placeholder="Escribe tu número aquí"
              maxLength={20}
              isRequired
              value={signUpForm.phone}
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
            <div className="flex flex-col -mt-3 gap-y-1">
              <p className="text-start text-large font-medium text-default-700 group-data-[filled=true]:text-default-700">
                Fecha<span className="text-xl text-red-500">*</span>
              </p>
              <DatePicker
                radius="none"
                showMonthAndYearPickers
                aria-label="Fecha de nacimiento"
                isRequired
                size="lg"
                name="birthDate"
                maxValue={today(getLocalTimeZone())}
                value={signUpForm.birthDate}
                onChange={(selectedDate) => {
                  updateField("birthDate", selectedDate);
                }}
                {...datePickerProperties}
              ></DatePicker>
            </div>
          </div>

          {state?.error && (
            <p className="text-center text-red-500 text-medium">
              {state.error}
            </p>
          )}
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox radius="none" name="remember" size="md">
              {signupInfo.rememberMe}
            </Checkbox>
          </div>
          <Button radius="none" color="primary" size="lg" type="submit">
            {signupInfo.submitButton}
          </Button>
        </form>

        <p className="text-lg text-center">
          {signupInfo.noAccount}{" "}
          <Link
            href="/login"
            className="text-lg transition text-secondary hover:text-primary"
          >
            {signupInfo.logIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
