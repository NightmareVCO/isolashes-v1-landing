import { ResetPasswordEmail } from "@ui/email/Email";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_SECONDS = 1000;
const VALID_TIME_IN_MINUTES = 30 * 60;

export async function GET() {
  const currentTime = Math.floor(Date.now() / TO_SECONDS);
  const expirationTime = currentTime + VALID_TIME_IN_MINUTES;

  try {
    await resend.emails.send({
      from: "vladimir@vladimircuriel.me",
      to: "vladimircuriel@outlook.com",
      subject: "Hello world",
      react: ResetPasswordEmail({
        userFirstname: "Vladimir",
        resetPasswordLink: `http://localhost:3000/auth/reset-password?token=1234&validate=${expirationTime}`,
      }),
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
