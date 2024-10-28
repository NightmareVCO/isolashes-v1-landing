"use client";

import { BranchesProperties } from "@data/branch.data";
import { HoursProperties } from "@data/hour.data";
import { ServicesProperties } from "@data/service.data";
import AccountDetailsForm from "@forms/AccountDetailsForm";
import useMultitabs from "@hooks/useMultitabs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Tab, Tabs } from "@nextui-org/react";
import AccountAppointments from "@ui/userMultitabs/appointments/AccountAppointments";

import AccountAddress from "./address/AccountAddress";
// import AccountCreditCard from "./creditCards/AccoutCreditCards";

type MultitabsProperties = {
  user: any;
  branchesSlots: BranchesProperties[];
  servicesSlots: ServicesProperties[];
  hourSlots: HoursProperties[];
  activeTab: string;
  userAddress: any;
};

export default function Multitabs({
  user,
  branchesSlots,
  servicesSlots,
  hourSlots,
  activeTab,
  userAddress,
  // userCreditCard,
}: MultitabsProperties) {
  const { handleTabChange } = useMultitabs();

  return (
    <Card radius="none" className="w-full h-full">
      <Tabs
        aria-label="Dynamic tabs"
        size="lg"
        color="secondary"
        variant="underlined"
        fullWidth
        defaultSelectedKey={activeTab || "citas"}
        classNames={{
          tab: "h-14",
        }}
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="citas"
          textValue="Citas"
          title={
            <div className="flex items-start justify-start w-24 gap-x-3">
              <div className="flex-1">
                <Icon icon="solar:calendar-date-linear" width={20} />
              </div>
              <div className="flex-2">
                <p className="font-semibold text-start">Citas</p>
              </div>
            </div>
          }
        >
          <AccountAppointments
            user={user}
            branchesSlots={branchesSlots}
            servicesSlots={servicesSlots}
            hourSlots={hourSlots}
          />
        </Tab>
        <Tab
          key="ordenes"
          textValue="Ordenes"
          className=""
          title={
            <div className="flex items-start justify-start w-24 gap-x-3">
              <div className="flex-1">
                <Icon icon="solar:money-bag-linear" width={20} />
              </div>
              <div className="flex-2">
                <p className="font-semibold text-start">Ordenes</p>
              </div>
            </div>
          }
        ></Tab>
        <Tab
          key="usuario"
          textValue="Usuario"
          title={
            <div className="flex items-start justify-start w-24 gap-x-3">
              <div className="flex-1">
                <Icon icon="solar:user-id-linear" width={20} />
              </div>
              <div className="flex-2">
                <p className="font-semibold text-start">Usuario</p>
              </div>
            </div>
          }
        >
          <AccountDetailsForm user={user} />
        </Tab>
        <Tab
          key="direcciones"
          textValue="Direcciones"
          title={
            <div className="flex items-start justify-start w-24 gap-x-3">
              <div className="flex-1">
                <Icon icon="solar:map-linear" width={20} />
              </div>
              <div className="flex-2">
                <p className="font-semibold text-start">Direcciones</p>
              </div>
            </div>
          }
        >
          <AccountAddress user={user} userAddress={userAddress} />
        </Tab>
        {/* <Tab
          key="tarjetas"
          textValue="Tarjetas"
          title={
            <div className="flex items-start justify-start w-24 gap-x-3">
              <div className="flex-1">
                <Icon icon="solar:card-linear" width={20} />
              </div>
              <div className="flex-2">
                <p className="font-semibold text-start">Tarjetas</p>
              </div>
            </div>
          }
        >
          <AccountCreditCard user={user} userCreditCard={userCreditCard} />
        </Tab> */}
      </Tabs>
    </Card>
  );
}
