import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "inner-link": "inset 0 -0.45em 0 0 rgba(219, 181, 104, 0.70)",
      },
      backgroundImage: {
        hero: "url('/hero.webp')",
        appointment: "url('/appointment.webp')",
        login: "url('/full_about1.png')",
        simpleHero: "url('/simple-hero-image.webp')",
      },

      fontFamily: {
        sunydale: ["Sunydale"],
      },
      colors: {
        brandPink: "#F4D9E5",
        grayBackground: "#F8F5F4",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      keyframes: {
        "scrolling-banner": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" }, // Ajustado para mover todo el contenido
        },
        "scrolling-banner-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" }, // Ajustado para movimiento vertical
        },
      },
      animation: {
        "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
        "scrolling-banner-vertical":
          "scrolling-banner-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#DBB568",
            secondary: "#C19843",
          },
        },
      },
    }),
  ],
};
export default config;
