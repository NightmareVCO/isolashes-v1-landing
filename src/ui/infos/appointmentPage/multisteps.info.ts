export type MultistepsInfoDesktop = typeof multistepsInfoDesktop;
export type MultistepsInfoMobile = typeof multistepsInfoMobile;

export const multistepsInfo = {
  title: "Agenda tu cita",
  description:
    "Agenda tu cita en 3 sencillos pasos y disfruta de nuestros servicios de la mejor calidad.",
  backButtonText: "Volver",
};

export const multistepsInfoDesktop = {
  steps: [
    {
      title: "Datos",
      description: "Ingresa tus datos personales para agendar tu cita.",
    },
    {
      title: "Servicio",
      description: "Selecciona el servicio que deseas recibir.",
    },
    {
      title: "Pago",
      description: "Realiza el pago de tu cita para confirmar tu asistencia.",
    },
  ],
};

export const multistepsInfoMobile = {
  steps: [
    {
      title: "Datos",
    },
    {
      title: "Servicio",
    },
    {
      title: "Pago",
    },
  ],
};
