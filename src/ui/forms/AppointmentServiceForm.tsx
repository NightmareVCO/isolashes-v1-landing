"use client";

import useAppointmentServiceForm from "@hooks/useForms/useAppointmentServiceForm";
import { appointmentServiceFormInfo } from "@infos/appointmentPage/appointmentServiceForm.info";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  DatePicker,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { FormService } from "@type/appointmentForm.types";
import Loading from "@ui/loading/Loading";
import { cn } from "@utils/cn";
import { motion } from "framer-motion";
import React from "react";

const radioGroupVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export type AppointmentServiceFormProperties =
  React.HTMLAttributes<HTMLFormElement> & {
    formService: FormService;
    updateFieldService: (field: string, value: any) => void;
    isServiceVisited?: boolean;
  };

const AppointmentServiceForm = React.forwardRef<
  HTMLFormElement,
  AppointmentServiceFormProperties
>(
  (
    {
      className,
      formService,
      updateFieldService,
      isServiceVisited,
      ...properties
    },
    reference,
  ) => {
    const {
      selectProperties,
      datePickerProperties,
      radioClassNames,
      formatter,
      hourSlots,
      branchesSlots,
      servicesCategoriesSlots,
      servicesSlots,
      isDateUnavailable,
      firstLoading,
      setFirstLoading,
      isLoading,
      isHoursLoading,
      isServicesLoading,
    } = useAppointmentServiceForm({
      form: formService,
      updateFieldService,
      isServiceVisited,
    });

    if (isLoading) {
      return <Loading />;
    }

    return (
      <section className="pt-10">
        <div className="text-4xl font-semibold leading-9 text-default-foreground">
          {appointmentServiceFormInfo.title}
        </div>
        <div className="py-2 text-default-500">
          {appointmentServiceFormInfo.description}
        </div>
        <form
          ref={reference}
          className={cn("flex flex-col lg:flex-row gap-4 py-5", className)}
          {...properties}
        >
          <div className="flex flex-col flex-3 gap-y-8">
            <Select
              radius="none"
              size="lg"
              label="Sucursal"
              name="sucursal"
              placeholder="Selecciona una sucursal"
              isRequired
              items={branchesSlots}
              value={formService.branch}
              defaultSelectedKeys={[formService.branch || 0]}
              onChange={(selectedValue) => {
                updateFieldService("branch", selectedValue.target.value);
                if (firstLoading) setFirstLoading(false);
              }}
              {...selectProperties}
            >
              {(branchesSlots) => (
                <SelectItem key={branchesSlots.id}>
                  {branchesSlots.name}
                </SelectItem>
              )}
            </Select>

            <Select
              radius="none"
              size="lg"
              label="Categoría de Servicio"
              name="service"
              placeholder="Selecciona la categoría del servicio"
              isRequired
              items={servicesCategoriesSlots}
              value={formService.category}
              defaultSelectedKeys={[formService.category || 0]}
              {...selectProperties}
              onChange={(selectedValue) => {
                updateFieldService("category", selectedValue.target.value);
              }}
            >
              {(servicesSlots) => (
                <SelectItem key={servicesSlots.id} title={servicesSlots.name}>
                  {servicesSlots.name}
                </SelectItem>
              )}
            </Select>

            {isServicesLoading ? (
              <>
                <p className="text-start text-large font-semibold text-default-700 group-data-[filled=true]:text-default-700">
                  Servicio<span className="text-xl text-red-500">*</span>
                </p>
                <Spinner />
              </>
            ) : (
              <Select
                radius="none"
                size="lg"
                label="Servicio"
                name="service"
                placeholder="Selecciona un servicio principal"
                isRequired
                items={servicesSlots}
                value={formService.service}
                defaultSelectedKeys={[formService.service || 0]}
                onChange={(selectedValue) => {
                  updateFieldService("service", selectedValue.target.value);
                }}
                {...selectProperties}
              >
                {(servicesSlots) => (
                  <SelectItem key={servicesSlots.id} title={servicesSlots.name}>
                    {servicesSlots.name}
                  </SelectItem>
                )}
              </Select>
            )}

            <div className="flex flex-col -mt-3 gap-y-1">
              <p className="text-start text-large font-semibold text-default-700 group-data-[filled=true]:text-default-700">
                Fecha<span className="text-xl text-red-500">*</span>
              </p>
              <DatePicker
                radius="none"
                aria-label="Fecha de la cita"
                isRequired
                size="lg"
                name="Fecha"
                defaultValue={today(getLocalTimeZone())}
                minValue={today(getLocalTimeZone())}
                maxValue={today(getLocalTimeZone()).add({ days: 60 })}
                value={formService.date}
                onChange={(selectedDate) => {
                  updateFieldService("date", selectedDate);
                }}
                isDateUnavailable={isDateUnavailable}
                {...datePickerProperties}
              ></DatePicker>
              <p className="text-md text-default-500">
                {formService.date
                  ? formatter.format(
                      formService.date.toDate(getLocalTimeZone()),
                    )
                  : "--"}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center flex-3">
            <p className="text-start text-large font-medium text-default-700 group-data-[filled=true]:text-default-700">
              Hora<span className="text-xl text-red-500">*</span>
            </p>

            {firstLoading ? (
              <div className="flex items-center justify-center w-full h-[416px] max-h-[420px] ">
                <p>Primero selecciona una sucursal</p>
              </div>
            ) : isHoursLoading ? (
              <div className="flex items-center justify-center w-full h-[416px] max-h-[420px] ">
                <Spinner />
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                className="w-full max-w-full h-[416px] max-h-[420px]"
                variants={radioGroupVariants}
              >
                <RadioGroup
                  className="flex flex-col justify-start w-full max-w-full h-[416px] max-h-[420px] overflow-y-scroll"
                  classNames={{
                    wrapper: "gap-4",
                  }}
                  aria-label="Hora de la cita"
                  isRequired
                  name="hours"
                  value={formService.hour}
                  defaultValue={formService.hour}
                  onChange={(event) => {
                    updateFieldService("hour", event.currentTarget.value);
                  }}
                >
                  {hourSlots.map((hour) => (
                    <Radio
                      classNames={radioClassNames}
                      value={hour.id}
                      name={hour.time}
                      key={hour.id}
                      isDisabled={!hour.isAvailable}
                    >
                      {hour.time}
                    </Radio>
                  ))}
                </RadioGroup>
              </motion.div>
            )}
          </div>
        </form>
      </section>
    );
  },
);

AppointmentServiceForm.displayName = appointmentServiceFormInfo.displayName;

export default AppointmentServiceForm;
