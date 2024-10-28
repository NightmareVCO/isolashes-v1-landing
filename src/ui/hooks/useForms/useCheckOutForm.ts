import { AutocompleteProps, InputProps, SelectProps } from "@nextui-org/react";
import { cn } from "@utils/cn";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";

import { processOrder } from "@/lib/action/order.action";
import { useCreatorFieldUpdater } from "@/utils/useCreatorFieldUpdater";

import useCartModel from "../useCartModel";

const AutocompleteProperties: Pick<
  AutocompleteProps,
  "labelPlacement" | "classNames"
> = {
  labelPlacement: "outside",
};

const inputProperties: Pick<InputProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
  },
};

const radioClassNames = {
  base: cn(
    "inline-flex m-0 bg-default-100 items-center justify-between min-w-80 lg:min-w-96",
    "flex-row-reverse w-full max-w-full cursor-pointer p-4 border-medium border-transparent",
    "data-[selected=true]:border-secondary",
  ),
  control: "bg-secondary text-secondary-foreground",
  wrapper: "group-data-[selected=true]:border-secondary",
  label: "text-medium text-default-500 font-medium",
  labelWrapper: "m-0",
};

const appearanceNoneClassName =
  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
const numberInputProperties: Pick<InputProps, "labelPlacement" | "classNames"> =
  {
    labelPlacement: "outside",
    classNames: {
      label:
        "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
      input: appearanceNoneClassName,
    },
  };

const selectProperties: Pick<SelectProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled=true]:text-default-700",
  },
};

type FormCheckOut = {
  country: string;
  state: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
  cardNumber: string;
  cvc: string;
  cardName: string;
  cardLastName: string;
  cardMonth: string;
  cardYear: string;
};

export default function useCheckOutForm({ userAddress, user }: any) {
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const { clearCart } = useCartModel({ user });
  const router = useRouter();

  const initialCheckOut: FormCheckOut = useMemo(
    () => ({
      country: "",
      state: "",
      city: "",
      street: "",
      number: "",
      zipCode: "",
      cardNumber: "",
      cvc: "",
      cardName: "",
      cardLastName: "",
      cardMonth: "",
      cardYear: "",
    }),
    [],
  );

  const [formData, setFormData] = useState<FormCheckOut>(initialCheckOut);
  const updateField = useCreatorFieldUpdater(setFormData);

  const [state, formAction] = useFormState(processOrder, undefined);

  useEffect(() => {
    if (selectedAddress) {
      const currentAddressData = userAddress.find(
        (address: any) => address.id === selectedAddress,
      );
      updateField("country", currentAddressData.country);
      updateField("state", currentAddressData.state);
      updateField("city", currentAddressData.city);
      updateField("street", currentAddressData.street);
      updateField("number", currentAddressData.number);
      updateField("zipCode", currentAddressData.zipCode);
    }
  }, [selectedAddress, userAddress, updateField]);

  const isCardNumberInvalid = useMemo(() => {
    if (!formData.cardNumber) return false;
    if (formData.cardNumber.length !== 19) return true;
    return false;
  }, [formData.cardNumber]);

  const isCvcInvalid = useMemo(() => {
    if (!formData.cvc) return false;
    if (formData.cvc.length !== 3) return true;
    return false;
  }, [formData.cvc]);

  const isButtonDisabled = useMemo(() => {
    return (
      !formData.country ||
      !formData.state ||
      !formData.city ||
      !formData.street ||
      !formData.number ||
      !formData.zipCode ||
      !formData.cardNumber ||
      !formData.cvc ||
      !formData.cardName ||
      !formData.cardLastName ||
      !formData.cardMonth ||
      !formData.cardYear ||
      isCardNumberInvalid ||
      isCvcInvalid
    );
  }, [formData, isCardNumberInvalid, isCvcInvalid]);

  return {
    inputProperties,
    radioClassNames,
    AutocompleteProperties,
    numberInputProperties,
    selectProperties,
    selectedAddress,
    setSelectedAddress,
    formData,
    updateField,
    isCardNumberInvalid,
    isCvcInvalid,
    isButtonDisabled,
    state,
    formAction,
    clearCart,
    router,
  };
}
