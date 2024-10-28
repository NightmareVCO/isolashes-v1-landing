import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function usePagination() {
  const searchParameters = useSearchParams();
  const parameters = useMemo(
    () => new URLSearchParams(searchParameters),
    [searchParameters],
  );

  const handleChangePage = useCallback(
    (page: number) => {
      parameters.set("pagina", page.toString());
      window.history.replaceState(null, "", `?${parameters.toString()}`);
    },
    [parameters],
  );

  return { handleChangePage };
}
