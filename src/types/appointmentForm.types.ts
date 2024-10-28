export type FormData = {
  name: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  promoTerms: boolean;
};

export type FormPayment = {
  cardNumber: string;
  cvc: string;
  cardName: string;
  cardLastName: string;
  cardAddress: string;
  sector: string;
  country: string;
  city: string;
  termsPayment: boolean;
  cardMonth: string;
  cardYear: string;
};

export type FormService = {
  branch: string;
  service: string;
  category: string;
  date: any;
  hour: string;
};

export type PartialFormData = Pick<
  FormData,
  "name" | "lastName" | "email" | "phone"
>;

export type GlobalForm = FormData & FormPayment & FormService;
