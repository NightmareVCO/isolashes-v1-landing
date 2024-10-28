"use client";

import { loginWithGoogle } from "@action/auth.action";
import { Icon } from "@iconify/react";
import { loginInfo } from "@infos/authPage/login.info";
import { Button } from "@nextui-org/react";

export default function GoogleLoginButton() {
  return (
    <div className="flex flex-col w-full gap-2 transition hover:scale-105">
      <Button
        onClick={() => {
          loginWithGoogle();
        }}
        size="lg"
        startContent={<Icon icon="flat-color-icons:google" width={24} />}
        variant="bordered"
      >
        {loginInfo.googleButton}
      </Button>
    </div>
  );
}
