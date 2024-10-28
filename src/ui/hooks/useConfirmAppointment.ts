import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useConfirmAppointment() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      await setTimeout(() => {
        router.push("/");
      }, 3000);
    }

    redirect();
  }, [router]);
}
