import { AccountAddressForm } from "@forms/AccountAddressForm";
import { useAccountAddress } from "@hooks/useAccountAddress";
import { accountAddressInfo } from "@infos/userPage/userAccountAddress.info";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

type AccountAddressProperties = {
  userAddress: any;
  user: any;
};

export default function AccountAddress({
  user,
  userAddress,
}: AccountAddressProperties) {
  const {
    radioClassNames,
    selectedAddress,
    setSelectedAddress,
    newAddress,
    setNewAddress,
    deleteFormAction,
    handleSubmit,
  } = useAccountAddress();

  return (
    <Card className="p-2" shadow="none" radius="none" fullWidth>
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-6">
        <h3 className="text-large">{accountAddressInfo.title}</h3>
        <Divider className="mb-3" />
        <p className="text-small text-default-400">
          {accountAddressInfo.description}
        </p>
      </CardHeader>

      <CardBody className="flex flex-col lg:flex-row w-full gap-x-5">
        <div className="flex flex-col w-full lg:w-3/4 lg:border-r ">
          <RadioGroup
            className="flex flex-col px-3 justify-start w-full max-w-full h-[416px] max-h-[420px] overflow-y-auto"
            classNames={{
              wrapper: "gap-4",
            }}
            aria-label="Dirección del usuario"
            isRequired
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

          <div className="flex justify-evenly py-5">
            <Button
              className="w-2/5"
              radius="none"
              color="primary"
              size="lg"
              type="submit"
              onClick={() => setNewAddress(true)}
            >
              {accountAddressInfo.newAddress}
            </Button>

            <form
              action={deleteFormAction}
              onSubmit={handleSubmit}
              className="w-2/5"
            >
              <input type="text" name="id" hidden readOnly value={user.id} />
              <input
                type="text"
                name="addressId"
                hidden
                readOnly
                value={selectedAddress}
              />
              <Button
                className="w-full"
                radius="none"
                color="danger"
                size="lg"
                type="submit"
                isDisabled={!selectedAddress}
              >
                {accountAddressInfo.deleteAddress}
              </Button>
            </form>
          </div>
        </div>

        <AccountAddressForm
          user={user}
          userAddress={userAddress}
          currentAddress={selectedAddress}
          setCurrentAddress={setSelectedAddress}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
        />
      </CardBody>
    </Card>
  );
}
