import { useCallback, useState } from "react";

export default function useMultitabs() {
  const [searchParameters] = useState(new URLSearchParams());

  const clearFilters = useCallback(() => {
    window.history.replaceState(null, "", `?tab=citas`);
  }, []);

  const handleTabChange = useCallback(
    (key: React.Key) => {
      const tab = key as string;
      if (tab !== null) {
        clearFilters();
        searchParameters.set("tab", tab);
        window.history.replaceState(
          null,
          "",
          `?${searchParameters.toString()}`,
        );
      }
    },
    [clearFilters, searchParameters],
  );

  return {
    handleTabChange,
  };
}
