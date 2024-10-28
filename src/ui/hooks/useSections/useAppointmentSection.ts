import { PartialFormData } from "@type/appointmentForm.types";
import { useCreatorFieldUpdater } from "@utils/useCreatorFieldUpdater";
import { useEffect, useMemo, useState } from "react";

export default function useAppointmentSection({ user }: any) {
  const initialValue: PartialFormData = {
    name: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const [form, setForm] = useState<PartialFormData>(initialValue);
  const updateField = useCreatorFieldUpdater(setForm);

  useEffect(() => {
    if (user) {
      updateField("name", user.name);
      updateField("lastName", user.lastName);
      updateField("email", user.email);
      updateField("phone", user.phone);
    }
  }, [user, updateField]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(form));
  }, [form]);

  const isEmailInvalid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return form.email ? !emailRegex.test(form.email) : false;
  }, [form.email]);

  const isPhoneInvalid = useMemo(() => {
    if (!form.phone) return false;
    return form.phone.length < 10;
  }, [form.phone]);

  const isButtonDisabled = useMemo(() => {
    return (
      !form.name ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      isPhoneInvalid
    );
  }, [form, isPhoneInvalid]);

  return {
    form,
    updateField,
    isEmailInvalid,
    isPhoneInvalid,
    isButtonDisabled,
  };
}
