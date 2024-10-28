import useAppointmentGlobalForm from "@hooks/useForms/useAppointmentGlobalForm";
import {
  FormData,
  FormPayment,
  FormService,
} from "@type/appointmentForm.types";

type AppointmentGlobalFormProperties = {
  formService: FormService;
  formPayment: FormPayment;
  formData: FormData;
  user: any;
  setIsSending: (value: boolean) => void;
};

export default function AppointmentGlobalForm({
  formData,
  formService,
  formPayment,
  user,
  setIsSending,
}: AppointmentGlobalFormProperties) {
  const { formAction } = useAppointmentGlobalForm({ setIsSending });

  return (
    <form className="hidden formAppointment" action={formAction}>
      <input type="text" name="id" readOnly value={user?.id} />
      <input
        type="text"
        name="cardNumber"
        readOnly
        value={formPayment.cardNumber}
      />
      <input type="text" name="cvc" readOnly value={formPayment.cvc} />
      <input
        type="text"
        name="cardName"
        readOnly
        value={formPayment.cardName}
      />
      <input
        type="text"
        name="cardLastName"
        readOnly
        value={formPayment.cardLastName}
      />
      <input
        type="text"
        name="cardAddress"
        readOnly
        value={formPayment.cardAddress}
      />
      <input type="text" name="sector" readOnly value={formPayment.sector} />
      <input type="text" name="country" readOnly value={formPayment.country} />
      <input type="text" name="city" readOnly value={formPayment.city} />
      <input
        type="checkbox"
        name="promoTerms"
        readOnly
        checked={formData.promoTerms}
      />
      <input
        type="checkbox"
        name="termsPayment"
        readOnly
        checked={formPayment.termsPayment}
      />
      <input
        type="text"
        name="cardMonth"
        readOnly
        value={formPayment.cardMonth}
      />
      <input
        type="text"
        name="cardYear"
        readOnly
        value={formPayment.cardYear}
      />

      <input type="text" name="branch" readOnly value={formService.branch} />
      <input type="text" name="service" readOnly value={formService.service} />
      <input
        type="text"
        name="date"
        readOnly
        value={formService.date.toString()}
      />
      <input type="text" name="hours" readOnly value={formService.hour} />
      <input type="text" name="name" readOnly value={formData.name} />
      <input type="text" name="lastName" readOnly value={formData.lastName} />
      <input type="text" name="email" readOnly value={formData.email} />
      <input
        type="text"
        name="confirmEmail"
        readOnly
        value={formData.confirmEmail}
      />
      <input type="text" name="phone" readOnly value={formData.phone} />
      <button type="submit">Enviar</button>
    </form>
  );
}
