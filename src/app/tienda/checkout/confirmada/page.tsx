"use client";

import useConfirmAppointment from "@hooks/useConfirmAppointment";
import { CheckIcon } from "@icons/CheckIcon";
import { Card } from "@nextui-org/react";
import { confirmCheckOut } from "@ui/infos/storePage/confirmCheckOut.info";

export default function ConfirmOder() {
  useConfirmAppointment();
  return (
    <section className="flex justify-center items-center w-full h-[calc(100vh_-_100px)]">
      <Card className="w-[500px] h-[500px] flex justify-center items-center gap-y-4">
        <h2 className="text-4xl font-semibold">{confirmCheckOut.title}</h2>
        <CheckIcon />
        <p className="text-xl">{confirmCheckOut.paragraph1}</p>
        <p className="text-xl">{confirmCheckOut.paragraph2}</p>
      </Card>
    </section>
  );
}
