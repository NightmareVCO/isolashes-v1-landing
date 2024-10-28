import { appointmentConfig } from "@config/site";
import useAppointment from "@hooks/useAppointment";
import Multisteps from "@ui/appointmentMultiSteps/Multisteps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: appointmentConfig.title,
  description: appointmentConfig.description,
};

export default async function Appointments() {
  const { user } = await useAppointment();
  return (
    <section className="mb-[740px] lg:mb-0">
      <Multisteps user={user} />
    </section>
  );
}
