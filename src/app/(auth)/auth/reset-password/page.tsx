"use client";

import { useRouter } from "next/navigation";

const TO_SECONDS = 1000;

export default function ResetPassword({ searchParams }: any) {
  const userId = searchParams?.token;
  const validation = searchParams?.validate;
  const router = useRouter();
  if (userId) console.log(userId);

  const currentTime = Math.floor(Date.now() / TO_SECONDS);
  const isValid = validation && currentTime <= Number.parseInt(validation, 10);

  if (!isValid) {
    router.push("/login");
  }

  return <div>Reset password</div>;
}
