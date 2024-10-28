import { login } from "@action/auth.action";
import { InputProps } from "@nextui-org/react";
import { FormLogin } from "@type/authForm.types";
import { useCreatorFieldUpdater } from "@utils/useCreatorFieldUpdater";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const InitialState: FormLogin = {
  email: "",
  password: "",
  remember: false,
};

const inputProperties: Pick<InputProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
  },
};

export default function useLoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [state, formAction] = useFormState(login, undefined);

  const [logInForm, setLogInForm] = useState<FormLogin>(InitialState);
  const updateField = useCreatorFieldUpdater(setLogInForm);

  useEffect(() => {
    if (state?.error) {
      state.error = "";
    }
  }, [logInForm, state]);

  return {
    logInForm,
    updateField,
    state,
    isVisible,
    toggleVisibility,
    formAction,
    inputProperties,
  };
}
