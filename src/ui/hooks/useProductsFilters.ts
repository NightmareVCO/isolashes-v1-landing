import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useProductsFilters() {
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const { replace, refresh } = useRouter();

  const clearFilters = useCallback(() => {
    replace(pathname);
    refresh();
  }, [pathname, replace, refresh]);

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      const parameters = new URLSearchParams(searchParameters);

      if (value) {
        parameters.set(name, value);
      } else {
        parameters.delete(name);
      }
      replace(`${pathname}?${parameters.toString()}`);
    },
    [pathname, searchParameters, replace],
  );

  return {
    clearFilters,
    handleFilterChange,
  };
}
