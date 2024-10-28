import { updateProfile } from "@lib/action/auth.action";
import { InputProps } from "@nextui-org/react";
import { FormUpdateUser } from "@type/authForm.types";
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

export default function useAccountDetailsForm({ user }: any) {
  const [state, formAction] = useFormState(updateProfile, undefined);
  const router = useRouter();

  const initialDetailsForm: FormUpdateUser = useMemo(
    () => ({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    }),
    [user],
  );

  const [accountDetailsForm, setAccountDetailsForm] =
    useState<FormUpdateUser>(initialDetailsForm);
  const updateField = useCreatorFieldUpdater(setAccountDetailsForm);

  const isPhoneInvalid = useMemo(() => {
    if (!accountDetailsForm.phone) return true;
    return accountDetailsForm.phone.length < 10;
  }, [accountDetailsForm.phone]);

  const isButtonDisabled = useMemo(() => {
    if (
      (accountDetailsForm.name === initialDetailsForm.name &&
        accountDetailsForm.lastName === initialDetailsForm.lastName &&
        accountDetailsForm.email === initialDetailsForm.email &&
        accountDetailsForm.phone === initialDetailsForm.phone) ||
      isPhoneInvalid
    )
      return true;
  }, [accountDetailsForm, initialDetailsForm, isPhoneInvalid]);

  const isEmailUnchanged = useMemo(() => {
    return user.google;
  }, [user]);

  useEffect(() => {
    if (state?.success) {
      toast.success("¡Usuario actualizado con éxito!");
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
    if (state?.error) {
      state.error = "";
      toast.error("¡Error actualizando el usuario, favor revise los datos!");
    }
  }, [state, state?.success, router]);

  return {
    inputProperties,
    accountDetailsForm,
    updateField,
    isPhoneInvalid,
    state,
    isEmailUnchanged,
    isButtonDisabled,
    formAction,
  };
}
