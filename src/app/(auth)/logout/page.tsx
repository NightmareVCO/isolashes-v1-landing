"use client";

import { logout } from "@action/auth.action";
import Loading from "@ui/loading/Loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    logout().then(() => router.push("/login"));
  }, [router]);
  return (
    <div className="min-h-[calc(100vh_-_106px)] flex justify-center items-center">
      <Loading />
    </div>
  );
}
