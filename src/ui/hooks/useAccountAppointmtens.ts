import { getUrlToFetch } from "@data/appointment.data";
import { fetcher } from "@utils/swrFetcher";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";

const NEXT_PUBLIC_APPOINTMENT_PER_PAGE =
  process.env.NEXT_PUBLIC_APPOINTMENT_PER_PAGE_USER || 8;

const setParameters = ({
  selectedStatus,
  selectedBranch,
  selectedHour,
  selectedService,
  selectedDate,
  page,
  user,
}: any) => {
  const id = user?.id || "";
  const order = "createdAt";
  const orderDirection = "desc";
  const takeValue = +NEXT_PUBLIC_APPOINTMENT_PER_PAGE;
  const skipValue = (+page - 1) * +NEXT_PUBLIC_APPOINTMENT_PER_PAGE;
  const status = selectedStatus;
  const branch = selectedBranch;
  const service = selectedService;
  const hour = selectedHour;
  const date = selectedDate;
  const cursor = "";

  return {
    id,
    order,
    orderDirection,
    takeValue,
    skipValue,
    status,
    branch,
    service,
    hour,
    date,
    cursor,
  };
};

export default function useAccountAppointments({ user }: any) {
  const initialSearchParameters = useSearchParams();
  const searchParameters = useMemo(
    () => new URLSearchParams(initialSearchParameters),
    [initialSearchParameters],
  );

  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    searchParameters.get("status") || "",
  );
  const [selectedBranch, setSelectedBranch] = useState(
    searchParameters.get("branch") || "",
  );
  const [selectedService, setSelectedService] = useState(
    searchParameters.get("service") || "",
  );
  const [selectedHour, setSelectedHour] = useState(
    searchParameters.get("hour") || "",
  );
  const [selectedDate, setSelectedDate] = useState(
    searchParameters.get("date") || "",
  );
  const [page, setPage] = useState(searchParameters.get("pagina") || 1);
  const [url, setUrl] = useState("");

  const clearFilters = useCallback(() => {
    setSelectedStatus("");
    setSelectedBranch("");
    setSelectedService("");
    setSelectedHour("");
    setSelectedDate("");
    setPage("1");
    window.history.replaceState(null, "", `?tab=citas&pagina=1`);
  }, []);

  const handleChangePage = useDebouncedCallback((page: number) => {
    searchParameters.set("pagina", page.toString());
    setPage(page.toString());
    window.history.replaceState(null, "", `?${searchParameters.toString()}`);
    window.scrollTo(0, 0);
  }, 300);

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      searchParameters.set("tab", "citas");

      if (!searchParameters.get("status")) searchParameters.delete("status");
      if (!searchParameters.get("branch")) searchParameters.delete("branch");
      if (!searchParameters.get("service")) searchParameters.delete("service");
      if (!searchParameters.get("hour")) searchParameters.delete("hour");
      if (!searchParameters.get("date")) searchParameters.delete("date");

      switch (name) {
        case "status": {
          setSelectedStatus(value);
          break;
        }
        case "branch": {
          setSelectedBranch(value);
          break;
        }
        case "service": {
          setSelectedService(value);
          break;
        }
        case "hour": {
          setSelectedHour(value);
          break;
        }
        case "date": {
          setSelectedDate(value);
          break;
        }
        default: {
          break;
        }
      }

      searchParameters.set(name, value);
      searchParameters.set("pagina", "1");
      setPage("1");
      window.history.replaceState(null, "", `?${searchParameters.toString()}`);
    },
    [searchParameters],
  );

  useEffect(() => {
    const fetchData = async () => {
      const values = setParameters({
        selectedStatus,
        selectedBranch,
        selectedService,
        selectedHour,
        selectedDate,
        page,
        user,
      });
      const url = await getUrlToFetch(values);
      setUrl(url);
      setShouldFetch(true);
    };
    fetchData();
  }, [
    selectedStatus,
    selectedBranch,
    selectedService,
    selectedHour,
    selectedDate,
    page,
    user,
  ]);

  const { data, isLoading } = useSWR(
    () => (shouldFetch ? { url, userId: user.id } : null),
    fetcher,
    {
      keepPreviousData: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  useEffect(() => {
    if (data) {
      setAppointments(data.appointments);
      setTotalAppointments(data.total);
    }
  }, [data]);

  const totalPages = Math.ceil(
    totalAppointments / +NEXT_PUBLIC_APPOINTMENT_PER_PAGE,
  );

  return {
    handleChangePage,
    handleFilterChange,
    clearFilters,
    selectedBranch,
    selectedStatus,
    selectedService,
    selectedHour,
    selectedDate,
    page,
    appointments,
    totalAppointments,
    isLoading,
    totalPages,
  };
}
