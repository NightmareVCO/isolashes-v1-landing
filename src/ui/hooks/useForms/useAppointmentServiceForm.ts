import type { DatePickerProps, SelectProps } from "@nextui-org/react";

import { BranchesProperties, getBranchesForSelect } from "@data/branch.data";
import { getServicesForSelect, ServicesProperties } from "@data/service.data";
import {
  getServicesCategoriesForSelect,
  ServicesCategoriesProperties,
} from "@data/servicesCategories.data";
import { DateValue, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { FormService } from "@type/appointmentForm.types";
import { cn } from "@utils/cn";
import { fetchGetRequest } from "@utils/fetchRequest";
import { useEffect, useMemo, useState } from "react";

type AppointmentServiceFormProperties = {
  form: FormService;
  updateFieldService: (field: string, value: any) => void;
  isServiceVisited?: boolean;
};

const selectProperties: Pick<SelectProps, "labelPlacement" | "classNames"> = {
  labelPlacement: "outside",
  classNames: {
    label:
      "text-large font-medium text-default-700 group-data-[filled=true]:text-default-700",
    popoverContent: "rounded-none",
  },
};
const datePickerProperties: Pick<
  DatePickerProps,
  "labelPlacement" | "classNames"
> = {
  labelPlacement: "outside",
  classNames: {
    popoverContent: "rounded-none",
  },
};
const radioClassNames = {
  base: cn(
    "inline-flex m-0 bg-default-100 items-center justify-between",
    "flex-row-reverse w-full  max-w-full cursor-pointer p-4 border-medium border-transparent",
    "data-[selected=true]:border-secondary",
  ),
  control: "bg-secondary text-secondary-foreground",
  wrapper: "group-data-[selected=true]:border-secondary",
  label: "text-small text-default-500 font-medium",
  labelWrapper: "m-0",
};

type HourSlotProperties = {
  id: string;
  time: string;
  isAvailable: boolean;
};

export default function useAppointmentServiceForm({
  form,
  updateFieldService,
  isServiceVisited,
}: AppointmentServiceFormProperties) {
  // delete weekends from the calendar
  const { locale } = useLocale();
  const isDateUnavailable = (date: DateValue) => isWeekend(date, locale);

  const [hourSlots, setTimeSlots] = useState<HourSlotProperties[]>([]);
  const [branchesSlots, setBranchesSlots] = useState<BranchesProperties[]>([]);
  const [servicesSlots, setServicesSlots] = useState<ServicesProperties[]>([]);
  const [servicesCategoriesSlots, setServicesCategoriesSlots] = useState<
    ServicesCategoriesProperties[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoursLoading, setIsHoursLoading] = useState(true);
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    if (isServiceVisited) setFirstLoading(false);
  }, [isServiceVisited]);

  // fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      setIsLoading(true);
      try {
        const branches = await getBranchesForSelect();
        setBranchesSlots(branches);
      } catch {
        //console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBranches();
  }, []);

  // fetch services categories
  useEffect(() => {
    const fetchServicesCategories = async () => {
      setIsLoading(true);
      try {
        const servicesCategories = await getServicesCategoriesForSelect();
        setServicesCategoriesSlots(servicesCategories);
      } catch {
        //console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServicesCategories();
  }, [updateFieldService]);

  //fetch services by category
  useEffect(() => {
    const fetchServicesCategories = async () => {
      setIsServicesLoading(true);
      try {
        const servicesCategories = await getServicesForSelect(form.category);
        setServicesSlots(servicesCategories);
        updateFieldService("service", "0");
      } catch {
        //console.error(error);
      } finally {
        setIsServicesLoading(false);
      }
    };
    fetchServicesCategories();
  }, [form.category, updateFieldService]);

  // fetch available time slots for the selected date
  useEffect(() => {
    const fetchTimeSlots = async () => {
      setIsHoursLoading(true);
      const { year, month, day } = form.date;
      const branch = form.branch;
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      try {
        const url = `${process.env.SERVER}/appointments/available/${branch}/${date}`;
        const hours = await fetchGetRequest({ url });
        setTimeSlots(hours);
      } catch {
        //console.error(error);
      } finally {
        setIsHoursLoading(false);
      }
    };
    if (form.date && form.branch) {
      fetchTimeSlots();
    }
  }, [form.date, form.branch]);

  // set the first available time slot as the default
  useEffect(() => {
    const firstAvailableTimeSlot = hourSlots.find(
      (hour: any) => hour.isAvailable === true,
    );

    if (firstAvailableTimeSlot) {
      updateFieldService("hour", firstAvailableTimeSlot.id);
    }
  }, [form.date, form.branch, updateFieldService, hourSlots]);

  const formatter = useMemo(
    () => new Intl.DateTimeFormat("es", { dateStyle: "full" }),
    [],
  );

  return {
    selectProperties,
    datePickerProperties,
    radioClassNames,
    formatter,
    hourSlots,
    branchesSlots,
    servicesCategoriesSlots,
    servicesSlots,
    isDateUnavailable,
    firstLoading,
    setFirstLoading,
    isLoading,
    isHoursLoading,
    isServicesLoading,
  };
}
