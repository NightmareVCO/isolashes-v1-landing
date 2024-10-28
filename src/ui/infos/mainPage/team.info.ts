export type TeamInfo = typeof teamInfo;
export type TeamPersonal = typeof teamPersonal;
import { mainPageImages } from "@config/images";

export const teamInfo = {
  normalText: "Equipo",
  styledText: "Profesional",
};

export const teamPersonal = [
  {
    imageSrc: mainPageImages.personal1,
    name: "Isobelina Veloz",
    role: "Lashista",
    description: "Me encargo de la aplicación de extensiones de pestañas.",
  },
  {
    imageSrc: mainPageImages.personal1,
    name: "Isobelina Veloz",
    role: "CEO",
    description:
      "Soy la CEO de la empresa y me encargo de la administración y dirección de la empresa.",
  },
  {
    imageSrc: mainPageImages.personal1,
    name: "Isobelina Veloz",
    role: "Micropigmentadora",
    description: "Me encargo de la aplicación de micropigmentación.",
  },
];
