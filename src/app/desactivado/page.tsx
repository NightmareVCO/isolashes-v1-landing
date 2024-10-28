"use client";

import CrossIcon from "@icons/CrossIcon";
import { inactivePageInfo } from "@infos/inactivePage/inactivePage.info";
import { Card, Link } from "@nextui-org/react";

export default function ConfirmAppointment() {
  return (
    <section className="flex justify-center items-center w-full h-[calc(100vh_-_100px)]">
      <Card className="w-[500px] h-[500px] flex justify-center items-center gap-y-4">
        <h2 className="text-4xl font-semibold">{inactivePageInfo.title}</h2>
        <CrossIcon />
        <p className="text-xl">{inactivePageInfo.paragraph1}</p>
        <p className="text-xl">{inactivePageInfo.paragraph2}</p>
        <Link href={inactivePageInfo.href} color="danger">
          {inactivePageInfo.linkText}
        </Link>
      </Card>
    </section>
  );
}
