import {
  League_Spartan as Spartan,
  Style_Script as Cursive,
} from "next/font/google";

export const fontSpartan = Spartan({
  subsets: ["latin"],
  variable: "--font-spartan",
  weight: "variable",
});

export const fontCursive = Cursive({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: "400",
});
