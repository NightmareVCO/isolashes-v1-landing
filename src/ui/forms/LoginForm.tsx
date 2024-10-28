"use client";

import useLoginForm from "@hooks/useForms/useLoginForm";
import { Icon } from "@iconify/react";
import { loginInfo } from "@infos/authPage/login.info";
import { Button, Checkbox, Divider, Input } from "@nextui-org/react";
import GoogleLoginButton from "@ui/buttons/GoogleLoginButton";
import Link from "next/link";

export default function LoginForm() {
  const {
    formAction,
    isVisible,
    toggleVisibility,
    state,
    logInForm,
    updateField,
    inputProperties,
  } = useLoginForm();

  return (
    <div className="flex items-center justify-center w-full bg-background">
      <div className="flex flex-col items-center w-full max-w-md gap-4 p-4">
        <div className="w-full text-center">
          <p className="text-4xl font-semibold leading-9 text-default-foreground">
            {loginInfo.title}
          </p>
          <p className="text-xl text-default-500">{loginInfo.description}</p>
        </div>

        <GoogleLoginButton />

        <div className="flex items-center w-full gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">Ó</p>
          <Divider className="flex-1" />
        </div>

        <form className="flex flex-col w-full gap-y-5" action={formAction}>
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
            value={logInForm.email}
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
            errorMessage="La contraseña es requerida"
            value={logInForm.password}
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
            {...inputProperties}
          />
          {state?.error && (
            <p className="text-center text-red-500 text-medium">
              {loginInfo.error}
            </p>
          )}
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox name="remember" radius="none" size="md">
              {loginInfo.rememberMe}
            </Checkbox>
            <Link className="text-default-500" href="#">
              {loginInfo.forgotPassword}
            </Link>
          </div>
          <Button radius="none" color="primary" size="lg" type="submit">
            {loginInfo.submitButton}
          </Button>
        </form>

        <p className="text-lg text-center">
          {loginInfo.noAccount}{" "}
          <Link
            href="/signup"
            className="text-lg transition text-secondary hover:text-primary"
          >
            {loginInfo.signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}
