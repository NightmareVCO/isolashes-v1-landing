"use client";

import useConfirmAppointment from "@hooks/useConfirmAppointment";
import { CheckIcon } from "@icons/CheckIcon";
import { appointmentConfirmInfo } from "@infos/appointmentPage/appointmentConfirm.info";
import { Card } from "@nextui-org/react";

export default function ConfirmAppointment() {
  useConfirmAppointment();
  return (
    <section className="flex justify-center items-center w-full h-[calc(100vh_-_100px)]">
      <Card className="w-[500px] h-[500px] flex justify-center items-center gap-y-4">
        <h2 className="text-4xl font-semibold">
          {appointmentConfirmInfo.title}
        </h2>
        <CheckIcon />
        <p className="text-xl">{appointmentConfirmInfo.paragraph1}</p>
        <p className="text-xl">{appointmentConfirmInfo.paragraph2}</p>
      </Card>
    </section>
  );
}
