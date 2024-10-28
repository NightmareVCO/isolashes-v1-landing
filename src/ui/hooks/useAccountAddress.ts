import { deleteUserAddress } from "@action/userAddress.action";
import { cn } from "@utils/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";

const radioClassNames = {
  base: cn(
    "inline-flex m-0 bg-default-100 items-center justify-between",
    "flex-row-reverse w-full max-w-full cursor-pointer p-4 border-medium border-transparent",
    "data-[selected=true]:border-secondary",
  ),
  control: "bg-secondary text-secondary-foreground",
  wrapper: "group-data-[selected=true]:border-secondary",
  label: "text-medium text-default-500 font-medium",
  labelWrapper: "m-0",
};

export function useAccountAddress() {
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [newAddress, setNewAddress] = useState<boolean>(false);
  const [status, deleteFormAction] = useFormState(deleteUserAddress, undefined);
  const { refresh } = useRouter();

  const handleSubmit = () => {
    setSelectedAddress(null);
    window.scrollTo(0, 0);
    refresh();
  };

  return {
    selectedAddress,
    setSelectedAddress,
    radioClassNames,
    newAddress,
    setNewAddress,
    status,
    deleteFormAction,
    handleSubmit,
  };
}
