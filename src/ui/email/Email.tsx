import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProperties {
  userFirstname?: string;
  resetPasswordLink?: string;
}

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailProperties) => {
  return (
    <Html>
      <Head />
      <Preview>Cambiar tu contraseña aquí.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="public/favicon.png"
            width="40"
            height="33"
            alt="Isolashes"
          />
          <Section>
            <Text style={text}>Hola {userFirstname},</Text>
            <Text style={text}>
              Alguien solicitó recientemente un cambio de contraseña para tu
              cuenta de Isolashes. Si fuiste tú, puedes establecer una nueva
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Cambiar Contraseña
            </Button>
            <Text style={text}>
              Si no deseas cambiar tu contraseña o no solicitaste esto,
              simplemente ignora y elimina este mensaje.
            </Text>

            <Text style={text}>Feliz Día!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "",
} as ResetPasswordEmailProperties;

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#DBB568",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};
