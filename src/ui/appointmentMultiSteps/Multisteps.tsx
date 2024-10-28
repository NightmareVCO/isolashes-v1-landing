"use client";

import AppointmentGlobalForm from "@forms/AppoinmentGlobalForm";
import useMultisteps from "@hooks/useMultisteps/useMultisteps";
import { multistepsNavigationsButtonsInfo as mNBI } from "@infos/appointmentPage/multistepsNavigationsButtons.info";
import MultistepSidebar from "@ui/appointmentMultiSteps/MultistepSidebar";
import MultistepNavigationButtons from "@ui/appointmentMultiSteps/NavigationButtons";

export default function Multisteps({ user }: any) {
  const {
    page,
    onBack,
    onChangePage,
    onNext,
    content,
    formData,
    formPayment,
    formService,
    setIsSending,
  } = useMultisteps({ user });

  return (
    <MultistepSidebar
      currentPage={page}
      onBack={onBack}
      onChangePage={onChangePage}
      onNext={onNext}
      formData={formData}
      formService={formService}
      formPayment={formPayment}
    >
      <div className="relative flex flex-col w-full pt-6 text-center min-h-[600px] h-fit lg:justify-center lg:h-full lg:pt-0">
        {content}
        <MultistepNavigationButtons
          backButtonProps={{ isDisabled: page === 0 }}
          className="justify-start hidden lg:flex disabled"
          nextButtonProps={{
            children:
              page === 0 ? mNBI.data : page === 2 ? mNBI.payment : mNBI.service,
          }}
          onBack={onBack}
          onNext={onNext}
          formData={formData}
          formService={formService}
          formPayment={formPayment}
        />
      </div>
      <AppointmentGlobalForm
        formData={formData}
        formPayment={formPayment}
        formService={formService}
        user={user}
        setIsSending={setIsSending}
      />
    </MultistepSidebar>
  );
}
