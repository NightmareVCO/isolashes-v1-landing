"use client";

import useProductsFilters from "@hooks/useProductsFilters";
import { Button, Select, SelectItem } from "@nextui-org/react";

type ProductsFiltersProperties = {
  productsCategoriesSlots: any[];
  selectedCategory: string;
  selectedStatus: string;
  selectedOrderBy: string;
};

export default function ProductsFilters({
  productsCategoriesSlots,
  selectedCategory,
  selectedStatus,
  selectedOrderBy,
}: ProductsFiltersProperties) {
  const { handleFilterChange, clearFilters } = useProductsFilters();

  return (
    <>
      <Select
        variant="faded"
        size="sm"
        label="Categoría"
        name="category"
        radius="full"
        defaultSelectedKeys={[selectedCategory]}
        onChange={handleFilterChange}
      >
        {productsCategoriesSlots?.length > 0 ? (
          productsCategoriesSlots.map((category) => (
            <SelectItem key={category.name} title={category.name}>
              {category.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem key="null" title="Not available">
            No hay categorías disponibles
          </SelectItem>
        )}
      </Select>

      <Select
        variant="faded"
        size="sm"
        label="Estado"
        name="status"
        radius="full"
        defaultSelectedKeys={[selectedStatus]}
        onChange={handleFilterChange}
      >
        <SelectItem key="Nuevos" title="Nuevos">
          Nuevos
        </SelectItem>
        <SelectItem key="En Oferta" title="En Oferta">
          En Oferta
        </SelectItem>
      </Select>

      <Select
        variant="bordered"
        size="sm"
        label="Ordenar por"
        name="orderBy"
        radius="full"
        defaultSelectedKeys={[selectedOrderBy]}
        onChange={handleFilterChange}
      >
        <SelectItem key="Precio Menor" title="Precio (bajo a alto)">
          Precio (bajo a alto)
        </SelectItem>
        <SelectItem key="Precio Mayor" title="Precio (alto a bajo)">
          Precio (alto a bajo)
        </SelectItem>
      </Select>

      <Button
        className="min-w-fit"
        variant="flat"
        radius="full"
        color="danger"
        onClick={clearFilters}
      >
        Limpiar Filtros
      </Button>
    </>
  );
}
