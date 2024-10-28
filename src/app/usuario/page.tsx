import { userConfig } from "@config/site";
import { getBranches } from "@data/branch.data";
import { getHours } from "@data/hour.data";
import { getServices } from "@data/service.data";
import { getUserAddress } from "@data/userAddress.data";
import useUser from "@hooks/useUser";
import Multitabs from "@ui/userMultitabs/Multitabs";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
// import { getUserCreditCard } from "@/lib/data/userCreditCard";

export const metadata: Metadata = {
  title: userConfig.title,
  description: userConfig.description,
};

export default async function User({ searchParams }: any) {
  const { user } = await useUser();
  const servicesSlots = await getServices();
  const branchesSlots = await getBranches();
  const hourSlots = await getHours();
  const activeTab = searchParams?.tab || "citas";
  const userAddress = await getUserAddress(user.id);
  // const userCreditCard = await getUserCreditCard(user.id)

  return (
    <section className={`flex flex-col w-full p-2 lg:p-10 min-h-[750px]`}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Multitabs
        user={user}
        branchesSlots={branchesSlots}
        servicesSlots={servicesSlots}
        hourSlots={hourSlots}
        activeTab={activeTab}
        userAddress={userAddress}
      />
    </section>
  );
}
