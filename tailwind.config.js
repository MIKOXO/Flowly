/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary and Accent Colors
        Primary: "hsl(225, 70%, 55%)",
        Accent: "hsl(225, 65%, 60%)",

        // Light Theme
        LightBg: "hsl(220, 25%, 98%)",
        LightText: "hsl(220, 15%, 20%)",
        LightBorder: "hsl(220, 15%, 88%)",
        LightMuted: "hsl(220, 15%, 94%)",
        LightSecondary: " hsl(220, 20%, 95%)",

        // Dark Theme
        DarkBg: "hsl(220, 20%, 12%)",
        DarkText: "hsl(220, 15%, 95%)",
        DarkCard: "hsl(220, 18%, 16%)",
        DarkBorder: " hsl(220, 18%, 22%)",
        DarkMuted: "hsl(220, 18%, 18%)",
        DarkSecondary: "hsl(220, 18%, 20%)",
      },
    },
  },
  plugins: [],
};
