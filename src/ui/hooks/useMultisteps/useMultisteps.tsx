import { getFormattedCurrentWeekDate } from "@data/dates.data";
import AppointmentDataForm from "@forms/AppointmentDataForm";
import AppointmentPaymentForm from "@forms/AppointmentPaymentForm";
import AppointmentServiceForm from "@forms/AppointmentServiceForm";
import { parseDate } from "@internationalized/date";
import {
  FormData,
  FormPayment,
  FormService,
} from "@type/appointmentForm.types";
import Loading from "@ui/loading/Loading";
import { useCreatorFieldUpdater } from "@utils/useCreatorFieldUpdater";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

const formattedDate = getFormattedCurrentWeekDate();
const formDataInitialValues: FormData = {
  name: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  phone: "",
  promoTerms: false,
};
const formServiceInitialValues: FormService = {
  branch: "0",
  service: "0",
  category: "0",
  date: parseDate(formattedDate),
  hour: "",
};
const formPaymentInitialValues: FormPayment = {
  cardNumber: "",
  cvc: "",
  cardName: "",
  cardLastName: "",
  cardAddress: "",
  sector: "",
  country: "",
  city: "",
  termsPayment: false,
  cardMonth: "",
  cardYear: "",
};

export default function useMultisteps({ user }: any) {
  const [isSending, setIsSending] = useState(false);
  const [isServiceVisited, setIsServiceVisited] = useState(false);

  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = useCallback((newDirection: number) => {
    setPage((previous) => {
      const nextPage = previous[0] + newDirection;

      if (nextPage < 0 || nextPage > 2) return previous;

      return [nextPage, newDirection];
    });
  }, []);
  const onChangePage = useCallback((newPage: number) => {
    setPage((previous) => {
      if (newPage < 0 || newPage > 2) return previous;
      const currentPage = previous[0];

      return [newPage, newPage > currentPage ? 1 : -1];
    });
  }, []);
  const onBack = useCallback(() => {
    paginate(-1);
  }, [paginate]);
  const onNext = useCallback(() => {
    paginate(1);

    if (page === 1) setIsServiceVisited(true);

    if (page === 2) {
      setIsSending(true);
      ("use client");
      const form = document.querySelector(".formAppointment");
      const submitButton = form?.querySelector('button[type="submit"]');
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.click();
      }
    }
  }, [paginate, page]);

  //global forms
  const [formData, setFormData] = useState<FormData>(formDataInitialValues);
  const [formService, setFormService] = useState<FormService>(
    formServiceInitialValues,
  );
  const [formPayment, setFormPayment] = useState<FormPayment>(
    formPaymentInitialValues,
  );

  const updateFieldData = useCreatorFieldUpdater(setFormData);
  const updateFieldService = useCreatorFieldUpdater(setFormService);
  const updateFieldPayment = useCreatorFieldUpdater(setFormPayment);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      updateFieldData("name", parsedData.name);
      updateFieldData("lastName", parsedData.lastName);
      updateFieldData("email", parsedData.email);
      if (user && user.email === parsedData.email)
        updateFieldData("confirmEmail", parsedData.email);
      updateFieldData("phone", parsedData.phone);
    } else if (user) {
      updateFieldData("name", user.name);
      updateFieldData("lastName", user.lastName);
      updateFieldData("email", user.email);
      updateFieldData("confirmEmail", user.email);
      updateFieldData("phone", user.phone);
    }
  }, [user, updateFieldData]);

  const content = useMemo(() => {
    let component = (
      <AppointmentDataForm
        user={user}
        formData={formData}
        updateFieldData={updateFieldData}
      />
    );

    switch (page) {
      case 1: {
        component = (
          <AppointmentServiceForm
            formService={formService}
            updateFieldService={updateFieldService}
            isServiceVisited={isServiceVisited}
          />
        );
        break;
      }
      case 2: {
        component = (
          <AppointmentPaymentForm
            user={user}
            formPayment={formPayment}
            updateFieldPayment={updateFieldPayment}
          />
        );
        break;
      }
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          key={page}
          animate="center"
          className="col-span-12"
          custom={direction}
          exit="exit"
          initial="exit"
          transition={{
            y: {
              ease: "backOut",
              duration: 0.35,
            },
            opacity: { duration: 0.4 },
          }}
          variants={variants}
        >
          {!isSending && component}
          {isSending && (
            <div className="flex items-center justify-center h-[600px]">
              <Loading />
            </div>
          )}
        </m.div>
      </LazyMotion>
    );
  }, [
    direction,
    page,
    user,
    formData,
    formService,
    formPayment,
    updateFieldData,
    updateFieldService,
    updateFieldPayment,
    isSending,
    isServiceVisited,
  ]);

  return {
    content,
    onBack,
    onChangePage,
    onNext,
    page,
    formData,
    formService,
    formPayment,
    isSending,
    setIsSending,
  };
}
