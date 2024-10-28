import useNavigationButtons from "@hooks/useMultisteps/useNavigationButtons";
import { Icon } from "@iconify/react";
import { multistepsNavigationsButtonsInfo as mNBI } from "@infos/appointmentPage/multistepsNavigationsButtons.info";
import type { ButtonProps } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import type {
  FormData,
  FormPayment,
  FormService,
} from "@type/appointmentForm.types";
import { cn } from "@utils/cn";
import * as React from "react";

type MultistepNavigationButtonsProperties =
  React.HTMLAttributes<HTMLDivElement> & {
    onBack?: () => void;
    onNext?: () => void;
    backButtonProps?: ButtonProps;
    nextButtonProps?: ButtonProps;
    formData: FormData;
    formService: FormService;
    formPayment: FormPayment;
  };

const MultistepNavigationButtons = React.forwardRef<
  HTMLDivElement,
  MultistepNavigationButtonsProperties
>(
  (
    {
      className,
      onBack,
      onNext,
      backButtonProps,
      nextButtonProps,
      formData,
      formService,
      formPayment,

      ...properties
    },
    reference,
  ) => {
    const currentPage =
      nextButtonProps?.children === mNBI.service
        ? 2
        : nextButtonProps?.children === mNBI.payment
          ? 3
          : 1;

    const { isFormComplete } = useNavigationButtons();

    return (
      <div
        ref={reference}
        className={cn(
          "mx-auto my-6 flex w-full items-center justify-center gap-x-4 lg:mx-0",
          className,
        )}
        {...properties}
      >
        <Button
          className="font-medium rounded-medium border-default-200 text-medium text-default-500 lg:hidden"
          variant="bordered"
          onPress={onBack}
          {...backButtonProps}
        >
          <Icon icon="solar:arrow-left-outline" width={24} />
          Volver atrás
        </Button>

        <div className="w-full lg:flex lg:justify-center lg:items-center">
          <Button
            radius="none"
            color="primary"
            className="text-white"
            size="lg"
            type="submit"
            onPress={onNext}
            isDisabled={
              !isFormComplete({
                currentPage,
                formData,
                formService,
                formPayment,
              })
            }
            {...nextButtonProps}
          >
            {nextButtonProps?.children || "No hay texto"}
          </Button>
        </div>
      </div>
    );
  },
);

MultistepNavigationButtons.displayName = "MultistepNavigationButtons";

export default MultistepNavigationButtons;
