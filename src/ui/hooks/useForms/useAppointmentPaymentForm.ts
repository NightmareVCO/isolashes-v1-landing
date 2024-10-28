import type {
  AutocompleteProps,
  InputProps,
  SelectProps,
} from "@nextui-org/react";

import { FormPayment } from "@type/appointmentForm.types";
import { useMemo } from "react";

const appearanceNoneClassName =
  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
const inputProperties: Pick<InputProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
  },
};
const numberInputProperties: Pick<InputProps, "labelPlacement" | "classNames"> =
  {
    labelPlacement: "outside",
    classNames: {
      label:
        "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
      input: appearanceNoneClassName,
    },
  };
const AutocompleteProperties: Pick<
  AutocompleteProps,
  "labelPlacement" | "classNames"
> = {
  labelPlacement: "outside",
};
const selectProperties: Pick<SelectProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled=true]:text-default-700",
  },
};

export default function useAppointmentPaymentForm(form: FormPayment) {
  const isCardNumberInvalid = useMemo(() => {
    if (!form.cardNumber) return false;
    if (form.cardNumber.length !== 19) return true;
    return false;
  }, [form.cardNumber]);

  const isCvcInvalid = useMemo(() => {
    if (!form.cvc) return false;
    if (form.cvc.length !== 3) return true;
    return false;
  }, [form.cvc]);

  return {
    isCardNumberInvalid,
    isCvcInvalid,
    inputProperties,
    numberInputProperties,
    AutocompleteProperties,
    selectProperties,
  };
}
