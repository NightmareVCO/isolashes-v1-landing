"use client";

import { Icon } from "@iconify/react";
import {
  multistepsInfo,
  multistepsInfoDesktop,
  multistepsInfoMobile,
} from "@infos/appointmentPage/multisteps.info";
import { multistepsNavigationsButtonsInfo as mNBI } from "@infos/appointmentPage/multistepsNavigationsButtons.info";
import { Button } from "@nextui-org/react";
import type {
  FormData,
  FormPayment,
  FormService,
} from "@type/appointmentForm.types";
import MultistepNavigationButtons from "@ui/appointmentMultiSteps/NavigationButtons";
import RowSteps from "@ui/appointmentMultiSteps/RowSteps";
import VerticalSteps from "@ui/appointmentMultiSteps/VerticalSteps";
import { cn } from "@utils/cn";
import React from "react";

export type MultiStepSidebarProperties =
  React.HTMLAttributes<HTMLDivElement> & {
    currentPage: number;
    onBack: () => void;
    onNext: () => void;
    onChangePage: (page: number) => void;
    formData: FormData;
    formService: FormService;
    formPayment: FormPayment;
  };

const stepperClasses = cn(
  "[--step-color:hsl(var(--nextui-black))]",
  "[--active-color:hsl(var(--nextui-black))]",
  "[--inactive-border-color:hsl(var(--nextui-black))]",
  "[--inactive-bar-color:hsl(var(--nextui-black))]",
  "[--inactive-color:hsl(var(--nextui-black))]",
);

const MultiStepSidebar = React.forwardRef<
  HTMLDivElement,
  MultiStepSidebarProperties
>(
  (
    {
      children,
      className,
      currentPage,
      onBack,
      onNext,
      // onChangePage,
      formData,
      formService,
      formPayment,
      ...properties
    },
    reference,
  ) => {
    return (
      <div
        ref={reference}
        className={cn(
          "flex h-[calc(100vh_-_100px)] mb-56 lg:mb-0 w-full gap-x-2 ",
          className,
        )}
        {...properties}
      >
        <div className="flex hidden h-full min-h-[600px] w-[344px] flex-shrink-0 flex-col items-start gap-y-8  bg-secondary px-8 py-6 shadow-small lg:flex">
          <Button
            className="font-medium shadow-lg bg-default-50 text-small text-default-500"
            isDisabled={currentPage === 0}
            radius="full"
            variant="flat"
            onPress={onBack}
          >
            <Icon icon="solar:arrow-left-outline" width={18} />
            {multistepsInfo.backButtonText}
          </Button>
          <div>
            <div className="text-2xl font-medium leading-7 text-default-foreground">
              {multistepsInfo.title}
            </div>
            <div className="mt-1 leading-6">{multistepsInfo.description}</div>
          </div>
          {/* Desktop Steps */}
          <VerticalSteps
            className={stepperClasses}
            color="secondary"
            currentStep={currentPage}
            steps={multistepsInfoDesktop.steps}
            // onStepChange={onChangePage}
          />
        </div>
        <div className="flex flex-col items-center w-full h-full gap-4 md:p-4">
          <div className="sticky top-0 z-10 w-full py-4 rounded-large bg-secondary shadow-small md:max-w-xl lg:hidden">
            <div className="flex justify-center">
              {/* Mobile Steps */}
              <RowSteps
                className={cn("pl-6", stepperClasses)}
                currentStep={currentPage}
                steps={multistepsInfoMobile.steps}
                // onStepChange={onChangePage}
              />
            </div>
          </div>
          <div className="w-full h-full p-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:m">
            {children}
            <MultistepNavigationButtons
              backButtonProps={{ isDisabled: currentPage === 0 }}
              className="lg:hidden"
              nextButtonProps={{
                children:
                  currentPage === 0
                    ? mNBI.data
                    : currentPage === 2
                      ? mNBI.payment
                      : mNBI.service,
              }}
              onBack={onBack}
              onNext={onNext}
              formData={formData}
              formService={formService}
              formPayment={formPayment}
            />
          </div>
        </div>
      </div>
    );
  },
);

MultiStepSidebar.displayName = "MultiStepSidebar";

export default MultiStepSidebar;
