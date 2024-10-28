export type FormLogin = {
  email: string;
  password: string;
  remember: boolean;
};

export type FormRegister = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: any;
  password: string;
};

export type FormAddress = {
  country: string;
  state: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

export type FormCreditCard = {
  number: string;
  expiration: string;
  cvc: string;
  name: string;
  lastName: string;
};

export type FormUpdateUser = Pick<
  FormRegister,
  "name" | "lastName" | "phone" | "email"
>;
