import { register } from "@action/auth.action";
import { getFormattedCurrentDate } from "@data/dates.data";
import { parseDate } from "@internationalized/date";
import { DatePickerProps, InputProps } from "@nextui-org/react";
import { FormRegister } from "@type/authForm.types";
import { useCreatorFieldUpdater } from "@utils/useCreatorFieldUpdater";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

const inputProperties: Pick<InputProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
  },
};
const datePickerProperties: Pick<
  DatePickerProps,
  "labelPlacement" | "classNames"
> = {
  labelPlacement: "outside",
  classNames: {},
};

const formattedDate = getFormattedCurrentDate();
const InitialState: FormRegister = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: parseDate(formattedDate),
  password: "",
};

export default function useSignupForm() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [state, formAction] = useFormState(register, undefined);

  const [signUpForm, setSignUpForm] = useState<FormRegister>(InitialState);
  const updateField = useCreatorFieldUpdater(setSignUpForm);

  useEffect(() => {
    if (state?.error) {
      state.error = "";
    }
    if (state?.success) {
      toast.success("¡Usuario creado con éxito!");
      setTimeout(() => {
        router.push("/login");
      }, 2750);
    }
  }, [signUpForm, state, router]);

  const isPhoneInvalid = useMemo(() => {
    if (!signUpForm.phone) return false;
    return signUpForm.phone.length < 10;
  }, [signUpForm.phone]);

  const isPasswordInvalid = useMemo(() => {
    if (!signUpForm.password) return false;
    const strongPasswordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*@^])/;
    return (
      signUpForm.password.length < 8 ||
      !strongPasswordRegex.test(signUpForm.password)
    );
  }, [signUpForm.password]);

  const formatter = new Intl.DateTimeFormat("es", { dateStyle: "full" });

  return {
    signUpForm,
    updateField,
    state,
    isVisible,
    toggleVisibility,
    formAction,
    inputProperties,
    isPhoneInvalid,
    datePickerProperties,
    formatter,
    isPasswordInvalid,
  };
}
