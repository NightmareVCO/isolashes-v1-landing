"use client";

import useAppointmentSection from "@hooks/useSections/useAppointmentSection";
import { appointmentInfo } from "@infos/mainPage/appointment.info";
import { Input } from "@nextui-org/react";
import StyledButton from "@ui/buttons/StyledButton";
import StyledHeading from "@ui/heading/StyledHeading";

type AppointmentSectionProperties = {
  user: any;
};

export default function AppointmentSection({
  user,
}: AppointmentSectionProperties) {
  const {
    form,
    updateField,
    isEmailInvalid,
    isPhoneInvalid,
    isButtonDisabled,
  } = useAppointmentSection({ user });

  return (
    <section className="flex items-center justify-center bg-appointment bg-center lg:min-h-[800px] h-[calc(100vh_-_150px)] bg-no-repeat bg-cover bg-fixed">
      <div className="flex flex-col items-center justify-center w-[400px] h-[600px] lg:w-[635px] bg-white shadow-2xl gap-y-8">
        <StyledHeading
          normalText={appointmentInfo.normalText}
          styledText={appointmentInfo.styledText}
        />

        {/* <div className="flex items-center justify-center">
          <p className="text-xl text-center text-pretty">
            {appointmentInfo.description}
          </p>
        </div> */}

        <div className="flex flex-col items-center justify-center px-5 gap-y-6">
          <Input
            className="lg:w-[500px] min-w-[350px]"
            radius="none"
            size="lg"
            label="Nombre"
            name="name"
            type="string"
            maxLength={30}
            value={form.name}
            onChange={(event) => updateField("name", event.currentTarget.value)}
            errorMessage="El nombre no puede estar vacío"
          />

          <Input
            className="w-full"
            radius="none"
            size="lg"
            label="Apellido"
            name="lastName"
            type="text"
            maxLength={30}
            value={form.lastName}
            onChange={(event) =>
              updateField("lastName", event.currentTarget.value)
            }
            errorMessage="El apellido no puede estar vacío"
          />

          <Input
            className="w-full"
            radius="none"
            size="lg"
            label="Email"
            name="email"
            type="email"
            maxLength={50}
            value={form.email}
            onChange={(event) =>
              updateField("email", event.currentTarget.value)
            }
            errorMessage="El email no es válido, debe contener un @ y un dominio válido"
            isInvalid={isEmailInvalid}
          />

          <Input
            className="w-full"
            radius="none"
            size="lg"
            name="phone"
            label="Teléfono"
            type="tel"
            maxLength={20}
            value={form.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.currentTarget.value.replaceAll(/\D/g, ""),
              )
            }
            errorMessage="El teléfono no es válido, debe contener al menos 10 dígitos"
            isInvalid={isPhoneInvalid}
          />
        </div>
        <StyledButton
          className="text-white"
          isDisabled={isButtonDisabled}
          href={appointmentInfo.buttonHref}
        >
          {appointmentInfo.buttonText}
        </StyledButton>
      </div>
    </section>
  );
}
