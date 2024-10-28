"use client";

import cities from "@data/cities.data";
import countries from "@data/countries.data";
import useCheckOutForm from "@hooks/useForms/useCheckOutForm";
import { Icon } from "@iconify/react";
import { accountAddressInfo } from "@infos/userPage/userAccountAddress.info";
import { accountCreditCardInfo } from "@infos/userPage/userAccountCreditCard.info";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";

type checkOutFormProperties = {
  userAddress: any;
  user: any;
  cart: any;
};

export default function CheckOutForm({
  userAddress,
  user,
  cart,
}: checkOutFormProperties) {
  const {
    inputProperties,
    AutocompleteProperties,
    numberInputProperties,
    radioClassNames,
    selectedAddress,
    setSelectedAddress,
    selectProperties,
    formData,
    updateField,
    isCardNumberInvalid,
    isCvcInvalid,
    isButtonDisabled,
    formAction,
    clearCart,
    router,
  } = useCheckOutForm({ userAddress, user });

  return (
    <form
      className="flex flex-col gap-y-5"
      action={(formData) => {
        formAction(formData);
        clearCart({ userId: user.id, cartId: cart.id });
        setTimeout(() => {
          router.push("/tienda/checkout/confirmada");
        }, 4000);
      }}
    >
      <div>
        <h3 className="text-large">{accountAddressInfo.title}</h3>
        <Divider />
      </div>
      <div className="flex flex-col w-full lg:max-w-[calc(100vw_-_485px)]">
        <RadioGroup
          className="flex flex-col justify-start px-3 overflow-y-auto"
          classNames={{
            wrapper: "gap-4 lg:flex-nowrap ",
          }}
          aria-label="Dirección del usuario"
          isRequired
          orientation="horizontal"
          name="address"
          value={selectedAddress}
          onChange={(event) => {
            setSelectedAddress(event.currentTarget.value);
          }}
        >
          {userAddress &&
            userAddress.map((address: any) => (
              <Radio
                key={address.id}
                value={address.id}
                classNames={radioClassNames}
              >
                {address.addressString}
              </Radio>
            ))}
        </RadioGroup>

        <div className="grid w-full grid-cols-8 gap-10 mt-7 lg:grid-cols-12">
          <div className="flex flex-col col-span-8 lg:col-span-6 gap-y-1">
            <p className="text-start text-large font-medium text-default-700 group-data-[filled=true]:text-default-700">
              País<span className="text-xl text-red-500">*</span>
            </p>
            <Autocomplete
              radius="none"
              size="lg"
              aria-label="País"
              name="country"
              type="text"
              placeholder="País"
              isRequired
              inputValue={formData.country}
              onInputChange={(value) => {
                updateField("country", value);
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
          <div className="flex flex-col col-span-8 lg:col-span-6 gap-y-1">
            <p className="text-start text-large font-medium text-default-700 group-data-[filled=true]:text-default-700">
              Provincia<span className="text-xl text-red-500">*</span>
            </p>
            <Autocomplete
              radius="none"
              size="lg"
              arial-label="Provincia"
              name="state"
              type="text"
              placeholder="Provincia"
              isRequired
              inputValue={formData.state}
              onInputChange={(value) => {
                updateField("state", value);
              }}
              {...AutocompleteProperties}
            >
              {cities.map((city) => (
                <AutocompleteItem key={city.value} value={city.value}>
                  {city.title}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>

          <Input
            className="flex flex-col col-span-8 lg:col-span-6 gap-y-1"
            radius="none"
            size="lg"
            label="Ciudad"
            name="city"
            type="text"
            placeholder="Ciudad"
            isRequired
            value={formData.city}
            onChange={(event) => {
              updateField("city", event.currentTarget.value);
            }}
            {...inputProperties}
          />

          {/* street/sector */}
          <Input
            className="flex flex-col col-span-8 lg:col-span-6 gap-y-1"
            radius="none"
            size="lg"
            label="Sector (incluir calle)"
            name="street"
            type="text"
            placeholder="Sector"
            isRequired
            value={formData.street}
            onChange={(event) => {
              updateField("street", event.currentTarget.value);
            }}
            {...inputProperties}
          />

          {/* house number */}
          <Input
            className="flex flex-col col-span-8 lg:col-span-6 gap-y-1"
            radius="none"
            size="lg"
            label="Número de casa"
            name="number"
            type="text"
            placeholder="Número de casa"
            isRequired
            value={formData.number}
            onChange={(event) => {
              updateField("number", event.currentTarget.value);
            }}
            {...inputProperties}
          />

          {/* zip code */}
          <Input
            className="flex flex-col col-span-8 lg:col-span-6 gap-y-1"
            radius="none"
            size="lg"
            label="Código postal"
            name="zipCode"
            type="number"
            placeholder="Código postal"
            isRequired
            value={formData.zipCode}
            onChange={(event) => {
              updateField("zipCode", event.currentTarget.value);
            }}
            {...inputProperties}
          />
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-large">{accountCreditCardInfo.title}</h3>
        <Divider />
      </div>

      <div className="grid w-full grid-cols-8 gap-10 mt-7 lg:grid-cols-12">
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
          value={formData.cardNumber}
          onChange={(event) => {
            let value = event.target.value.replaceAll(/\D/g, "");
            value = value.replaceAll(/(\d{4})/g, "$1 ").trim();
            updateField("cardNumber", value);
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
          value={formData.cardMonth}
          defaultSelectedKeys={[formData.cardMonth]}
          onChange={(selectedValue) => {
            updateField("cardMonth", selectedValue.target.value);
          }}
          {...selectProperties}
        >
          {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => {
            const paddedValue = String(value).padStart(2, "0");
            return (
              <SelectItem key={`key${value}`} value={paddedValue}>
                {paddedValue}
              </SelectItem>
            );
          })}
        </Select>
        <Select
          className="col-span-12 md:col-span-2"
          radius="none"
          size="lg"
          label="Año"
          name="card-year"
          placeholder="YY"
          isRequired
          value={formData.cardYear}
          defaultSelectedKeys={[formData.cardYear]}
          onChange={(selectedValue) => {
            updateField("cardYear", selectedValue.target.value);
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
          value={formData.cvc}
          onChange={(event) => {
            const onlyNumbers = event.target.value.replaceAll(/\D/g, "");
            updateField("cvc", onlyNumbers);
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
          value={formData.cardName}
          onChange={(event) => {
            updateField("cardName", event.target.value);
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
          value={formData.cardLastName}
          onChange={(event) => {
            updateField("cardLastName", event.target.value);
          }}
          {...inputProperties}
        />
      </div>

      <div className="flex items-center justify-center">
        <Button
          className="w-1/4 mt-5 text-white"
          radius="none"
          color="primary"
          size="lg"
          type="submit"
          isDisabled={isButtonDisabled}
        >
          Pagar
        </Button>
      </div>

      <input type="hidden" name="id" value={user.id} />
      {/* userName, usePhone, userEmail from user  */}
      <input type="hidden" name="userName" value={user.name} />
      <input type="hidden" name="userPhone" value={user.phone} />
      <input type="hidden" name="userEmail" value={user.email} />
      <input type="hidden" name="cartItems" value={JSON.stringify(cart)} />
      <input type="hidden" name="total" value={cart.totalPrice} />
    </form>
  );
}
