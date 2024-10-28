"use client";

import { mainPageImages } from "@config/images";
import { BranchesProperties } from "@data/branch.data";
import { HoursProperties } from "@data/hour.data";
import { ServicesProperties } from "@data/service.data";
import useAccountAppointments from "@hooks/useAccountAppointmtens";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import StyledButton from "@ui/buttons/StyledButton";
import AppointmentFilters from "@ui/filters/AppointmentFilters";
import Image from "next/image";
import React from "react";

type AccountAppointmentsProperties = {
  user: any;
  branchesSlots: BranchesProperties[];
  servicesSlots: ServicesProperties[];
  hourSlots: HoursProperties[];
};

export default function AccountAppointments({
  user,
  branchesSlots,
  servicesSlots,
  hourSlots,
}: AccountAppointmentsProperties) {
  const {
    totalPages,
    handleChangePage,
    handleFilterChange,
    clearFilters,
    selectedBranch,
    selectedStatus,
    selectedService,
    selectedHour,
    selectedDate,
    page,
    appointments,
    isLoading,
  } = useAccountAppointments({
    user,
  });

  return (
    <Card shadow="none" radius="none" fullWidth>
      <CardHeader className="flex-col items-center justify-center hidden lg:flex gap-x-5">
        <div className="items-center justify-center hidden w-full lg:flex gap-x-5">
          <AppointmentFilters
            branchesSlots={branchesSlots}
            servicesSlots={servicesSlots}
            hourSlots={hourSlots}
            selectedStatus={selectedStatus}
            selectedBranch={selectedBranch}
            selectedHour={selectedHour}
            selectedService={selectedService}
            selectedDate={selectedDate}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
          />
        </div>
        {isLoading && (
          <div className="flex items-center justify-center pt-5 min-h-[452px]">
            <Spinner color="primary" />
          </div>
        )}
      </CardHeader>
      {!isLoading && appointments?.length > 0 && (
        <div className=" min-h-[452px] ">
          {appointments.map((appointment: any) => (
            <Card
              key={appointment.id}
              shadow="none"
              className="p-4 border-y"
              radius="none"
              fullWidth
            >
              <CardBody className="flex flex-row flex-wrap items-center justify-center p-0 lg:items-start lg:justify-start sm:flex-nowrap">
                <Image
                  alt="Imagen del servicio realizado en la cita"
                  className="flex-none object-cover object-top w-1/2 h-auto rounded-lg md:w-48"
                  src={appointment.image ?? mainPageImages.labios}
                  width={200}
                  height={200}
                />
                <div className="px-4 py-5">
                  <h3 className="text-xl font-medium">
                    {appointment.service.name} -{" "}
                    {appointment.service.serviceCategory.name}
                  </h3>
                  <div className="flex flex-col gap-3 pt-2 text-large text-default-400">
                    <div className="flex items-center justify-start gap-x-4">
                      <p>
                        Nombre del cliente:{" "}
                        <span className="text-default-500">
                          {appointment.fullName}
                        </span>
                      </p>
                      <p>
                        Número de teléfono:{" "}
                        <span className="text-default-500">
                          {appointment.phone}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-start gap-x-4">
                      <p>
                        Fecha:{" "}
                        <span className="text-default-500">
                          {new Date(appointment.date).toLocaleDateString("es", {
                            timeZone: "UTC",
                          })}
                        </span>
                      </p>
                      <p>
                        Hora:{" "}
                        <span className="text-default-500">
                          {appointment.hours.time}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-start gap-x-4">
                      <p>
                        Sucursal:{" "}
                        <span className="text-default-500">
                          {appointment.branch.name}
                        </span>
                      </p>
                      <p>Estado: </p>
                      {appointment.completed ? (
                        <Chip color="success" variant="flat" size="md">
                          Completado
                        </Chip>
                      ) : (
                        <Chip color="warning" variant="flat" size="md">
                          Pendiente
                        </Chip>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      {appointments?.length > 0 && (
        <div className="flex items-center justify-center pt-4">
          <Pagination
            radius="none"
            onChange={handleChangePage}
            loop
            showControls
            size="lg"
            total={totalPages == 0 ? 1 : totalPages}
            initialPage={+page}
            page={+page}
          />
        </div>
      )}
      {!isLoading && appointments?.length == 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4 text-xl font-medium">No hay citas para mostrar.</p>
          <StyledButton href="/citas">Agendar cita</StyledButton>
        </div>
      )}
    </Card>
  );
}
