import cities from "@data/cities.data";
import countries from "@data/countries.data";
import { useAccountAddressForm } from "@hooks/useForms/useAccountAddressForm";
import { accountAddressInfo } from "@infos/userPage/userAccountAddress.info";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";

type AccountAddressFormProperties = {
  currentAddress: any;
  setCurrentAddress: any;
  userAddress: any;
  user: any;
  newAddress?: boolean;
  setNewAddress?: any;
};

export function AccountAddressForm({
  user,
  currentAddress,
  setCurrentAddress,
  userAddress,
  newAddress,
  setNewAddress,
}: AccountAddressFormProperties) {
  const {
    formAction,
    editFormAction,
    handleSubmit,
    inputProperties,
    accountAddressForm,
    updateField,
    AutocompleteProperties,
    isButtonDisabled,
  } = useAccountAddressForm({
    userAddress,
    currentAddress,
    setCurrentAddress,
    newAddress,
    setNewAddress,
  });

  return (
    <form
      action={currentAddress ? editFormAction : formAction}
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-8 gap-10 mt-2 lg:grid-cols-12 lg:-mt-2"
    >
      <input
        type="text"
        name="id"
        hidden
        readOnly
        className="sr-only"
        value={user.id}
      />
      <input
        type="text"
        name="addressId"
        hidden
        readOnly
        value={currentAddress}
      />
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
          inputValue={accountAddressForm.country}
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
          inputValue={accountAddressForm.state}
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
        value={accountAddressForm.city}
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
        value={accountAddressForm.street}
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
        value={accountAddressForm.number}
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
        value={accountAddressForm.zipCode}
        onChange={(event) => {
          updateField("zipCode", event.currentTarget.value);
        }}
        {...inputProperties}
      />

      <div className="flex items-center justify-center col-span-8 lg:col-span-12">
        <Button
          className="w-2/5"
          radius="none"
          color="primary"
          size="lg"
          type="submit"
          isDisabled={isButtonDisabled}
        >
          {currentAddress
            ? accountAddressInfo.editAddress
            : accountAddressInfo.saveAddress}
        </Button>
      </div>
    </form>
  );
}
