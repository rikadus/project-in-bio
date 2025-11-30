import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-primary": "#050505",
        "background-secondary": "#0f0f10",
        "background-tertiary": "#19191a",
        "content-body": "#CDCBCC",
        "content-placeholder": "#827d7f",
        "content-headline": "#B2B2B2",
        "border-primary": "#19191A",
        "border-secondary": "#323234",
        "border-tertiary": "#19191A",
        "accent-green": "#87BB2D",
        "accent-pink": "#B5446B",
        "accent-purple": "#4B2DBB",
      },
    },
  },
  plugins: [],
};
export default config;
