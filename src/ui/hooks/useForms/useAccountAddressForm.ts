import {
  createUserAddress,
  updateUserAddress,
} from "@action/userAddress.action";
import { AutocompleteProps, InputProps } from "@nextui-org/react";
import { FormAddress } from "@type/authForm.types";
import { useCreatorFieldUpdater } from "@utils/useCreatorFieldUpdater";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";

const inputProperties: Pick<InputProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
  },
};
const AutocompleteProperties: Pick<
  AutocompleteProps,
  "labelPlacement" | "classNames"
> = {
  labelPlacement: "outside",
};

export function useAccountAddressForm({
  userAddress,
  currentAddress,
  setCurrentAddress,
  newAddress,
  setNewAddress,
}: any) {
  const [state, formAction] = useFormState(createUserAddress, undefined);
  const [editState, editFormAction] = useFormState(
    updateUserAddress,
    undefined,
  );
  const { refresh } = useRouter();

  const initialAddressForm: FormAddress = useMemo(
    () => ({
      country: "",
      state: "",
      city: "",
      street: "",
      number: "",
      zipCode: "",
    }),
    [],
  );

  const [accountAddressForm, setAccountAddressForm] =
    useState<FormAddress>(initialAddressForm);
  const updateField = useCreatorFieldUpdater(setAccountAddressForm);

  const isButtonDisabled = useMemo(() => {
    if (
      accountAddressForm.country === "" ||
      accountAddressForm.state === "" ||
      accountAddressForm.city === "" ||
      accountAddressForm.street === "" ||
      accountAddressForm.number === "" ||
      accountAddressForm.zipCode === ""
    )
      return true;
  }, [accountAddressForm]);

  const handleSubmit = () => {
    setAccountAddressForm(initialAddressForm);
    refresh();
  };

  useEffect(() => {
    if (currentAddress) {
      const currentAddressData = userAddress.find(
        (address: any) => address.id === currentAddress,
      );
      updateField("country", currentAddressData.country);
      updateField("state", currentAddressData.state);
      updateField("city", currentAddressData.city);
      updateField("street", currentAddressData.street);
      updateField("number", currentAddressData.number);
      updateField("zipCode", currentAddressData.zipCode);
    }
  }, [currentAddress, userAddress, updateField]);

  useEffect(() => {
    if (newAddress) {
      setAccountAddressForm(initialAddressForm);
      setNewAddress(false);
      setCurrentAddress(null);
    }
  }, [newAddress, setNewAddress, setCurrentAddress, initialAddressForm]);

  return {
    state,
    formAction,
    handleSubmit,
    editState,
    editFormAction,
    inputProperties,
    AutocompleteProperties,
    accountAddressForm,
    updateField,
    isButtonDisabled,
  };
}
