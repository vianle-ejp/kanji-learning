import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2937",
        paper: "#f7f1e3",
        moss: "#5d7a63",
        persimmon: "#cc6b49",
      },
    },
  },
  plugins: [],
};

export default config;
