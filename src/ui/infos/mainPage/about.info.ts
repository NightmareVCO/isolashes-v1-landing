export type AboutInfo = typeof aboutInfo;

import { mainPageImages } from "@config/images";

export const aboutInfo = {
  normalText: "SOBRE",
  styledText: "ISOLASHES",
  subtitle: "Trabajamos el arte de las pestañas con amor",
  description:
    "Somos una empresa dedicada al servicio de las extensiones de pestañas. Ofrecemos una amplia variedad de productos para la aplicación de pestañas. Contamos con una academia de aplicación de pestañas y micropigmentación. Estamos ubicados en Santiago, República Dominicana",
  image1: {
    src: mainPageImages?.about1,
    alt: "Imagen de Nosotros",
  },
  image2: {
    src: mainPageImages?.about2,
    alt: "Imagen de Nosotros",
  },
  buttonText: "Agendar Cita",
  buttonHref: "/citas",
};
