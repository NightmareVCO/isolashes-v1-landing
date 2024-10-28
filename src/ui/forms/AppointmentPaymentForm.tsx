"use client";

import useAppointmentPaymentForm from "@hooks/useForms/useAppointmentPaymentForm";
import { Icon } from "@iconify/react";
import { appointmentPaymentFormInfo } from "@infos/appointmentPage/appointmentPaymentForm.info";
// import cities from "@infos/appointmentPage/entries/cities";
// import countries from "@infos/appointmentPage/entries/countries";
import {
  // Autocomplete,
  // AutocompleteItem,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FormPayment } from "@type/appointmentForm.types";
import { cn } from "@utils/cn";
import React from "react";

export type ReviewAndPaymentFormProperties =
  React.HTMLAttributes<HTMLFormElement> & {
    formPayment: FormPayment;
    updateFieldPayment: (field: string, value: string) => void;
    user: any;
  };

const AppointmentPaymentForm = React.forwardRef<
  HTMLFormElement,
  ReviewAndPaymentFormProperties
>(
  (
    { className, formPayment, updateFieldPayment, user, ...properties },
    reference,
  ) => {
    const {
      inputProperties,
      isCardNumberInvalid,
      isCvcInvalid,
      numberInputProperties,
      // AutocompleteProperties,
      selectProperties,
    } = useAppointmentPaymentForm(formPayment);

    return (
      <section className="mt-5">
        <div className="pt-4 text-4xl font-semibold leading-9 text-default-foreground">
          {appointmentPaymentFormInfo.title}
        </div>
        <div className="py-2 text-default-500">
          {appointmentPaymentFormInfo.description}
        </div>
        <form
          ref={reference}
          className={cn(
            "flex grid grid-cols-12 flex-col gap-4 gap-y-8 py-8",
            className,
          )}
          {...properties}
        >
          <Input
            className="col-span-12 text-sm bg-transparent rounded-sm md:col-span-6 text-default-500"
            radius="none"
            size="lg"
            label="Número de Tarjeta"
            name="card-number"
            type="tel"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            isRequired
            value={formPayment.cardNumber}
            onChange={(event) => {
              let value = event.target.value.replaceAll(/\D/g, "");
              value = value.replaceAll(/(\d{4})/g, "$1 ").trim();
              updateFieldPayment("cardNumber", value);
            }}
            isInvalid={isCardNumberInvalid}
            startContent={
              <span>
                <Icon
                  className="text-default-400"
                  icon="solar:card-bold"
                  width={24}
                />
              </span>
            }
            {...numberInputProperties}
          />
          <Select
            className="col-span-12 md:col-span-2"
            radius="none"
            size="lg"
            label="Mes"
            name="card-month"
            placeholder="MM"
            isRequired
            value={formPayment.cardMonth}
            defaultSelectedKeys={[formPayment.cardMonth]}
            onChange={(selectedValue) => {
              updateFieldPayment("cardMonth", selectedValue.target.value);
            }}
            {...selectProperties}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (value) => {
                const paddedValue = String(value).padStart(2, "0");
                return (
                  <SelectItem key={`key${value}`} value={paddedValue}>
                    {paddedValue}
                  </SelectItem>
                );
              },
            )}
          </Select>
          <Select
            className="col-span-12 md:col-span-2"
            radius="none"
            size="lg"
            label="Año"
            name="card-year"
            placeholder="YY"
            isRequired
            value={formPayment.cardYear}
            defaultSelectedKeys={[formPayment.cardYear]}
            onChange={(selectedValue) => {
              updateFieldPayment("cardYear", selectedValue.target.value);
            }}
            {...selectProperties}
          >
            {Array.from(
              { length: 15 },
              (_, index) => new Date().getFullYear() + index,
            ).map((value) => {
              const yearValue = String(value);
              return (
                <SelectItem key={`key${value}`} value={yearValue}>
                  {yearValue}
                </SelectItem>
              );
            })}
          </Select>
          <Input
            className="col-span-12 md:col-span-2"
            radius="none"
            size="lg"
            label="CVC"
            name="card-cvc"
            type="tel"
            placeholder="CVC"
            maxLength={3}
            isRequired
            value={formPayment.cvc}
            onChange={(event) => {
              const onlyNumbers = event.target.value.replaceAll(/\D/g, "");
              updateFieldPayment("cvc", onlyNumbers);
            }}
            isInvalid={isCvcInvalid}
            {...numberInputProperties}
          />

          <Input
            className="col-span-12 md:col-span-6"
            radius="none"
            size="lg"
            label="Nombre en la Tarjeta"
            name="card-name"
            type="text"
            placeholder="Escribe el nombre del titular aquí"
            maxLength={30}
            isRequired
            value={formPayment.cardName}
            onChange={(event) => {
              updateFieldPayment("cardName", event.target.value);
            }}
            {...inputProperties}
          />

          <Input
            className="col-span-12 md:col-span-6"
            radius="none"
            size="lg"
            label="Apellido en la Tarjeta"
            name="card-lastname"
            type="text"
            placeholder="Escribe el apellido del titular aquí"
            maxLength={30}
            isRequired
            value={formPayment.cardLastName}
            onChange={(event) => {
              updateFieldPayment("cardLastName", event.target.value);
            }}
            {...inputProperties}
          />

          {/* <Input
            className="col-span-12 md:col-span-7"
            radius="none"
            size="lg"
            label="Dirección Asociada"
            name="card-address"
            type="text"
            placeholder="Escribe la dirección asociada a la tarjeta aquí"
            maxLength={50}
            isRequired
            value={formPayment.cardAddress}
            onChange={(event) => {
              updateFieldPayment("cardAddress", event.target.value);
            }}
            {...inputProperties}
          />

          <div className="flex flex-col col-span-12 -mt-2 md:col-span-5 gap-y-1">
            <p className="text-start text-large font-medium text-default-700 group-data-[filled=true]:text-default-700">
              Sector<span className="text-xl text-red-500">*</span>
            </p>
            <Input
              className="col-span-12 md:col-span-6"
              radius="none"
              size="lg"
              name="sector"
              type="text"
              placeholder="Sector"
              isRequired
              value={formPayment.sector}
              onChange={(event) => {
                updateFieldPayment("sector", event.target.value);
              }}
              {...AutocompleteProperties}
            />
          </div>

          <div className="flex flex-col col-span-12 -mt-4 md:col-span-6 gap-y-1">
            <p className="text-start text-large font-medium text-default-700 group-data-[filled=true]:text-default-700">
              País<span className="text-xl text-red-500">*</span>
            </p>
            <Autocomplete
              className="col-span-12 md:col-span-6"
              radius="none"
              size="lg"
              aria-label="País"
              name="country"
              type="text"
              placeholder="País"
              isRequired
              defaultInputValue={formPayment.country}
              value={formPayment.country}
              onInputChange={(value) => {
                updateFieldPayment("country", value);
              }}
              {...AutocompleteProperties}
            >
              {countries.map((country) => (
                <AutocompleteItem key={country.value} value={country.value}>
                  {country.title}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>

          <div className="flex flex-col col-span-12 -mt-4 md:col-span-6 gap-y-1">
            <p className="text-start text-large font-medium text-default-700 group-data-[filled=true]:text-default-700">
              Ciudad<span className="text-xl text-red-500">*</span>
            </p>
            <Autocomplete
              className="col-span-12 md:col-span-6"
              radius="none"
              size="lg"
              arial-label="Ciudad"
              name="city"
              type="text"
              placeholder="Ciudad"
              isRequired
              defaultInputValue={formPayment.city}
              value={formPayment.city}
              onInputChange={(value) => {
                updateFieldPayment("city", value);
              }}
              {...AutocompleteProperties}
            >
              {cities.map((city) => (
                <AutocompleteItem key={city.value} value={city.value}>
                  {city.title}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div> */}

          {user && (
            <Checkbox
              className="col-span-12 p-1 m-0 text-left"
              radius="none"
              size="lg"
              name="terms-payment"
              color="secondary"
            >
              {appointmentPaymentFormInfo.checkboxText}
            </Checkbox>
          )}
        </form>
      </section>
    );
  },
);

AppointmentPaymentForm.displayName = appointmentPaymentFormInfo.displayName;

export default AppointmentPaymentForm;
