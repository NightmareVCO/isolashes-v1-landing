import type { InputProps } from "@nextui-org/react";
import type { FormData } from "@type/appointmentForm.types";

import { useMemo } from "react";

const inputProperties: Pick<InputProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
  },
};

export default function useAppointmentDataForm(form: FormData) {
  const isEmailInvalid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return form.email ? !emailRegex.test(form.email) : false;
  }, [form.email]);

  const isConfirmEmailInvalid = useMemo(() => {
    if (!form.email || !form.confirmEmail) return false;

    return form.email !== form.confirmEmail;
  }, [form.email, form.confirmEmail]);

  const isPhoneInvalid = useMemo(() => {
    if (!form.phone) return false;
    return form.phone.length < 10;
  }, [form.phone]);

  return {
    isEmailInvalid,
    isConfirmEmailInvalid,
    isPhoneInvalid,
    inputProperties,
  };
}
