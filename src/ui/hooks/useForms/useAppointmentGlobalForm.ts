import { createAppointment } from "@action/appointment.action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export default function useAppointmentGlobalForm({ setIsSending }: any) {
  const router = useRouter();
  const [state, formAction] = useFormState(createAppointment, undefined);

  //show a toast when the form is submitted and refresh the page
  useEffect(() => {
    if (state?.success) {
      setIsSending(false);
      router.push("/citas/confirmada");
    }
    if (state?.error) {
      toast.error("¡Error creando la cita, favor revise los datos!");
    }
  }, [state, state?.success, router, setIsSending]);

  return {
    formAction,
  };
}
