import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export function useNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleSearchVisibility = useCallback(() => {
    setIsSearchOpen(!isSearchOpen);
  }, [isSearchOpen]);

  const searchReference = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        searchReference.current &&
        !searchReference.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const search = formData.get("search") as string;
      if (!search) return;
      router.push(`/tienda/productos?query=${search}`);
    },
    [router],
  );

  return {
    isMenuOpen,
    setIsMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    pathName,
    handleSearchVisibility,
    searchReference,
    handleSearch,
  };
}
