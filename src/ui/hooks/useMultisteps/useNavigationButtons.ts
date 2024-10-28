import {
  FormData,
  FormPayment,
  FormService,
} from "@type/appointmentForm.types";
type FormCompleteProperties = {
  currentPage: number;
  formData: FormData;
  formService: FormService;
  formPayment: FormPayment;
};

export function validateFormData(formData: FormData) {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!formData.name) errors.name = "El nombre es requerido.";
  if (!formData.lastName) errors.lastName = "El apellido es requerido.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = "El email es requerido.";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "El email no es válido.";
  }
  if (formData.email !== formData.confirmEmail)
    errors.confirmEmail = "Los emails no coinciden.";
  if (!formData.phone) {
    errors.phone = "El teléfono es requerido.";
  } else if (formData.phone.length < 10) {
    errors.phone = "El teléfono debe tener al menos 10 caracteres.";
  }
  return errors;
}
export function validateFormService(formService: FormService) {
  const errors: Partial<Record<keyof FormService, string>> = {};
  if (+formService.branch === 0) errors.branch = "La sucursal es requerida.";
  if (+formService.service === 0) errors.service = "El servicio es requerido.";
  if (!formService.date) errors.date = "La fecha es requerida.";
  if (!formService.hour) errors.hour = "La hora es requerida.";
  return errors;
}
export function validateFormPayment(formPayment: FormPayment) {
  const errors: Partial<Record<keyof FormPayment, string>> = {};
  if (!formPayment.cardNumber) {
    errors.cardNumber = "El número de la tarjeta es requerido.";
  } else if (formPayment.cardNumber.length !== 19) {
    errors.cardNumber = "El número de la tarjeta debe tener 19 caracteres.";
  }
  if (!formPayment.cvc) {
    errors.cvc = "El CVC es requerido.";
  } else if (formPayment.cvc.length !== 3) {
    errors.cvc = "El CVC debe tener 3 caracteres.";
  }
  if (!formPayment.cardName)
    errors.cardName = "El nombre en la tarjeta es requerido.";
  if (!formPayment.cardLastName)
    errors.cardLastName = "El apellido en la tarjeta es requerido.";
  // if (!formPayment.cardAddress)
  //   errors.cardAddress = "La dirección en la tarjeta es requerida.";
  // if (!formPayment.sector) errors.sector = "El sector es requerido.";
  // if (!formPayment.country) errors.country = "El país es requerido.";
  // if (!formPayment.city) errors.city = "La ciudad es requerida.";
  if (!formPayment.cardMonth)
    errors.cardMonth = "El mes de la tarjeta es requerido.";
  if (!formPayment.cardYear)
    errors.cardYear = "El año de la tarjeta es requerido.";

  return errors;
}

const isFormComplete = ({
  currentPage,
  formData,
  formService,
  formPayment,
}: FormCompleteProperties) => {
  switch (currentPage) {
    case 1: {
      if (!formData) return false;
      const errors = validateFormData(formData);
      return Object.keys(errors).length === 0;
    }

    case 2: {
      if (!formService) return false;
      const errors = validateFormService(formService);
      return Object.keys(errors).length === 0;
    }

    case 3: {
      if (!formPayment) return false;
      const errors = validateFormPayment(formPayment);
      return Object.keys(errors).length === 0;
    }
    default: {
      return false;
    }
  }
};

export default function useNavigationButtons() {
  return { isFormComplete };
}
