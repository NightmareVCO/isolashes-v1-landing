"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="hidden lg:flex w-full items-center gap-x-3 border-b-1 border-divider bg-primary px-6 py-2 sm:px-3.5 sm:before:flex-1">
      <p className="text-md text-primary-foreground">
        ¡Revisa nuestra nueva colección de productos en nuestra tienda virtual!
        &nbsp;
      </p>
      <Link href="/">
        <Button
          className="relative font-medium group h-9 bg-secondary text-md text-foreground"
          endContent={
            <Icon
              className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
              icon="solar:arrow-right-linear"
              width={16}
            />
          }
          href="#"
          radius="full"
        >
          <span className="mt-0.5">Revisar</span>
        </Button>
      </Link>
      <div className="flex justify-end flex-1">
        <Button
          isIconOnly
          aria-label="Close Banner"
          className="-m-1"
          size="sm"
          variant="light"
          onClick={() => setIsVisible(false)}
        >
          <Icon
            aria-hidden="true"
            className="text-primary-foreground"
            icon="lucide:x"
            width={20}
          />
        </Button>
      </div>
    </div>
  );
}
