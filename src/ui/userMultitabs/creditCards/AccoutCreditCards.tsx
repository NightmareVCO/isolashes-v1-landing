import {
  createUserCreditCard,
  deleteUserCreditCard,
  updateUserCreditCard,
} from "@action/userCreditCard.action";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  InputProps,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  SelectProps,
} from "@nextui-org/react";
import { FormCreditCard } from "@type/authForm.types";
import { cn } from "@utils/cn";
import { useCreatorFieldUpdater } from "@utils/useCreatorFieldUpdater";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";

type AccountCreditCardProperties = {
  userCreditCard: any;
  user: any;
};

export const accountCreditCardInfo = {
  title: "Tarjeta de crédito",
  description: "Agrega o actualiza tu tarjeta de crédito",
  newCard: "Nueva tarjeta",
  deleteCard: "Borrar tarjeta",
  saveCard: "Guardar tarjeta",
  editCard: "Editar tarjeta",
};

const inputProperties: Pick<InputProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
  },
};
const appearanceNoneClassName =
  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
const numberInputProperties: Pick<InputProps, "labelPlacement" | "classNames"> =
  {
    labelPlacement: "outside",
    classNames: {
      label:
        "text-large font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
      input: appearanceNoneClassName,
    },
  };
const selectProperties: Pick<SelectProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled=true]:text-default-700",
  },
};

export function useAccountCreditCardForm({
  userCreditCard,
  currentCard,
  setCurrentCard,
  newCard,
  setNewCard,
}: any) {
  const [state, formAction] = useFormState(createUserCreditCard, undefined);
  const [editState, editFormAction] = useFormState(
    updateUserCreditCard,
    undefined,
  );
  const { refresh } = useRouter();

  const initialCardForm: FormCreditCard = useMemo(
    () => ({
      number: "",
      expiration: "",
      cvc: "",
      name: "",
      lastName: "",
    }),
    [],
  );

  const [accountCreditCardForm, setAccountCreditCardForm] =
    useState<FormCreditCard>(initialCardForm);
  const updateField = useCreatorFieldUpdater(setAccountCreditCardForm);

  const isButtonDisabled = useMemo(() => {
    if (
      accountCreditCardForm.number === "" ||
      accountCreditCardForm.expiration === "" ||
      accountCreditCardForm.cvc === "" ||
      accountCreditCardForm.name === "" ||
      accountCreditCardForm.lastName === ""
    )
      return true;
  }, [accountCreditCardForm]);

  const handleSubmit = () => {
    setAccountCreditCardForm(initialCardForm);
    refresh();
  };

  useEffect(() => {
    if (currentCard) {
      const currentCardData = userCreditCard.find(
        (card: any) => card.id === currentCard,
      );
      updateField("number", currentCardData.number);
      updateField("expiration", currentCardData.expiration);
      updateField("cvc", currentCardData.cvv);
      updateField("name", currentCardData.name);
      updateField("lastName", currentCardData.lastName);
    }
  }, [currentCard, userCreditCard, updateField]);

  useEffect(() => {
    if (newCard) {
      setAccountCreditCardForm(initialCardForm);
      setNewCard(false);
      setCurrentCard(null);
    }
  }, [newCard, setNewCard, setCurrentCard, initialCardForm]);

  const isCardNumberInvalid = useMemo(() => {
    if (!accountCreditCardForm.number) return false;
    if (accountCreditCardForm.number.length !== 19) return true;
    return false;
  }, [accountCreditCardForm.number]);

  const isCvcInvalid = useMemo(() => {
    if (!accountCreditCardForm.cvc) return false;
    if (accountCreditCardForm.cvc.length !== 3) return true;
    return false;
  }, [accountCreditCardForm.cvc]);

  return {
    state,
    formAction,
    handleSubmit,
    editState,
    editFormAction,
    inputProperties,
    numberInputProperties,
    selectProperties,
    accountCreditCardForm,
    updateField,
    isButtonDisabled,
    isCardNumberInvalid,
    isCvcInvalid,
  };
}

type AccountCreditCardFormProperties = {
  currentCard: any;
  setCurrentCard: any;
  userCreditCard: any;
  user: any;
  newCard?: boolean;
  setNewCard?: any;
};

export function AccountCreditCardForm({
  user,
  currentCard,
  setCurrentCard,
  userCreditCard,
  newCard,
  setNewCard,
}: AccountCreditCardFormProperties) {
  const {
    formAction,
    editFormAction,
    handleSubmit,
    inputProperties,
    numberInputProperties,
    selectProperties,
    accountCreditCardForm,
    updateField,
    isButtonDisabled,
    isCardNumberInvalid,
    isCvcInvalid,
  } = useAccountCreditCardForm({
    userCreditCard,
    currentCard,
    setCurrentCard,
    newCard,
    setNewCard,
  });

  return (
    <form
      action={currentCard ? editFormAction : formAction}
      onSubmit={handleSubmit}
      className="grid items-center w-full grid-cols-12 -mt-2 gap-x-10"
    >
      <input
        type="text"
        name="id"
        hidden
        readOnly
        className="sr-only"
        value={user.id}
      />
      <input type="text" name="cardId" hidden readOnly value={currentCard} />
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
        value={accountCreditCardForm.number}
        onChange={(event) => {
          let value = event.target.value.replaceAll(/\D/g, "");
          value = value.replaceAll(/(\d{4})/g, "$1 ").trim();
          updateField("number", value);
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
        value={accountCreditCardForm.expiration.split("/")[0]}
        defaultSelectedKeys={[accountCreditCardForm.expiration.split("/")[0]]}
        onChange={(selectedValue) => {
          updateField("expiration", selectedValue.target.value);
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
        value={accountCreditCardForm.expiration.split("/")[1]}
        defaultSelectedKeys={[accountCreditCardForm.expiration.split("/")[1]]}
        onChange={(selectedValue) => {
          updateField("expiration", selectedValue.target.value);
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
        value={accountCreditCardForm.cvc}
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
        value={accountCreditCardForm.name}
        onChange={(event) => {
          updateField("name", event.target.value);
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
        value={accountCreditCardForm.lastName}
        onChange={(event) => {
          updateField("lastName", event.target.value);
        }}
        {...inputProperties}
      />

      <div className="flex items-center justify-center col-span-12">
        <Button
          className="w-2/5"
          radius="none"
          color="primary"
          size="lg"
          type="submit"
          isDisabled={isButtonDisabled}
        >
          {currentCard
            ? accountCreditCardInfo.editCard
            : accountCreditCardInfo.saveCard}
        </Button>
      </div>
    </form>
  );
}

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

export function useAccountCreditCard() {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [newCard, setNewCard] = useState<boolean>(false);
  const [status, deleteFormAction] = useFormState(
    deleteUserCreditCard,
    undefined,
  );
  const { refresh } = useRouter();

  const handleSubmit = () => {
    setSelectedCard(null);
    window.scrollTo(0, 0);
    refresh();
  };

  return {
    selectedCard,
    setSelectedCard,
    radioClassNames,
    newCard,
    setNewCard,
    status,
    deleteFormAction,
    handleSubmit,
  };
}

export default function AccountCreditCard({
  user,
  userCreditCard,
}: AccountCreditCardProperties) {
  const {
    radioClassNames,
    selectedCard,
    setSelectedCard,
    newCard,
    setNewCard,
    deleteFormAction,
    handleSubmit,
  } = useAccountCreditCard();

  return (
    <Card className="p-2" shadow="none" radius="none" fullWidth>
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-6">
        <h3 className="text-large">{accountCreditCardInfo.title}</h3>
        <Divider className="mb-3" />
        <p className="text-small text-default-400">
          {accountCreditCardInfo.description}
        </p>
      </CardHeader>

      <CardBody className="flex flex-col w-full lg:flex-row gap-x-5">
        <div className="flex flex-col w-full border-r lg:w-3/4 2-2">
          <RadioGroup
            className="flex flex-col px-3 justify-start w-full max-w-full h-[416px] max-h-[420px] overflow-y-auto"
            classNames={{
              wrapper: "gap-4",
            }}
            aria-label="Tarjeta del usuario"
            isRequired
            value={selectedCard}
            onChange={(event) => {
              setSelectedCard(event.currentTarget.value);
            }}
          >
            {userCreditCard &&
              userCreditCard.map((card: any) => (
                <Radio
                  key={card.id}
                  value={card.id}
                  classNames={radioClassNames}
                >
                  {card.cardString}
                </Radio>
              ))}
          </RadioGroup>

          <div className="flex py-5 justify-evenly">
            <Button
              className="w-2/5"
              radius="none"
              color="primary"
              size="lg"
              type="submit"
              onClick={() => setNewCard(true)}
            >
              {accountCreditCardInfo.newCard}
            </Button>

            <form
              action={deleteFormAction}
              onSubmit={handleSubmit}
              className="w-2/5"
            >
              <input type="text" name="id" hidden readOnly value={user.id} />
              <input
                type="text"
                name="cardId"
                hidden
                readOnly
                value={selectedCard}
              />
              <Button
                className="w-full"
                radius="none"
                color="danger"
                size="lg"
                type="submit"
                isDisabled={!selectedCard}
              >
                {accountCreditCardInfo.deleteCard}
              </Button>
            </form>
          </div>
        </div>

        <AccountCreditCardForm
          user={user}
          userCreditCard={userCreditCard}
          currentCard={selectedCard}
          setCurrentCard={setSelectedCard}
          newCard={newCard}
          setNewCard={setNewCard}
        />
      </CardBody>
    </Card>
  );
}
