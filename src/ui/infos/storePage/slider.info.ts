export type SlidesInfo = typeof slidesInfo;
import { temporaryProductImages } from "@config/images";

export const slidesInfo = [
  {
    id: 1,
    title: "Blister de Pestañas",
    description: "¡Desde RD$780!",
    img: temporaryProductImages.store_cover1,
    url: "/tienda/productos?category=Insumos+de+Cejas",
    bg: "bg-gradient-to-r from-brandPink to-primary",
  },
  {
    id: 2,
    title: "Pinzas para Pestañas",
    description: "¡Desde RD$1450!",
    img: temporaryProductImages.store_cover2,
    url: "/tienda/productos?category=Pinza",
    bg: "bg-gradient-to-r from-primary via-primary/70 to-primary",
  },
  {
    id: 3,
    title: "Adhesivos para Pestañas",
    description: "¡Desde RD$1800!",
    img: temporaryProductImages.store_cover3,
    url: "/tienda/productos?category=Adhesivo",
    bg: "bg-gradient-to-r from-brandPink to-secondary",
  },
];
