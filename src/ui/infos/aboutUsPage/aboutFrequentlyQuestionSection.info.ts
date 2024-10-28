import { mainPageImages } from "@config/images";

export type FrequentlyQuestionSectionInfo =
  typeof frequentlyQuestionSectionInfo;

export type AboutFrequentlyQuestionSectionInfo =
  typeof aboutFrequentlyQuestionSectionInfo;

export const aboutFrequentlyQuestionSectionInfo = {
  title: "Peguntas frecuentes",
  titlePart1: "Preguntas",
  titlePart2: "Frecuentes",
  image: mainPageImages.about1,
};

export const frequentlyQuestionSectionInfo = [
  {
    title: "¿Qué es Isolashes?",
    content:
      "Somos una empresa dedicada al servicio de las extensiones de pestañas. Ofrecemos una amplia variedad de productos para la aplicación de pestañas. Contamos con una academia de aplicación de pestañas y micropigmentación. Estamos ubicados en Santiago, República Dominicana",
  },
  {
    title: "¿Cuál es el horario de atención?",
    content: "Nuestro horario de atención es de 9:00 AM a 6:00 PM",
  },
  {
    title: "¿Cuáles son los servicios que ofrecen?",
    content: " Ofrecemos servicios de pestañas, labios y pestañas.",
  },
  {
    title: "¿Cuál es el precio de los servicios?",
    content:
      "El precio de los servicios varía según el tipo de servicio y la duración del mismo. Puedes ver los precios en nuestra página de servicios.",
  },
  {
    title: "¿Cuál es la política de cancelación?",
    content: "Puedes cancelar tu cita hasta 24 horas antes de la misma.",
  },
  {
    title: "¿El costo de la reserva es adicional?",
    content:
      " No, el costo de la reserva está incluido en el precio del servicio.",
  },
  {
    title: "¿Hay algún descuento para clientes frecuentes?",
    content:
      "Sí, ofrecemos beneficios para clientes frecuentes con nuestros sistema de fidelidad.",
  },
];
