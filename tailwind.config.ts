import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#7B2C2C",
          50: "#F5E8E8",
          100: "#E8CDCD",
          200: "#D4A0A0",
          300: "#C07373",
          400: "#AC4646",
          500: "#7B2C2C",
          600: "#632323",
          700: "#4B1A1A",
          800: "#321111",
          900: "#1A0909",
        },
        gold: {
          DEFAULT: "#D6A93B",
          50: "#FDF8EC",
          100: "#F9EFD5",
          200: "#F3DFAB",
          300: "#EDCF81",
          400: "#E7BF57",
          500: "#D6A93B",
          600: "#B08A2F",
          700: "#896B23",
          800: "#624C18",
          900: "#3C2D0C",
        },
        cream: "#F6F0EB",
        olive: {
          DEFAULT: "#6B7A53",
          50: "#F2F4EE",
          100: "#E4E8DD",
          200: "#C9D1BB",
          300: "#AEBA99",
          400: "#93A377",
          500: "#6B7A53",
          600: "#556242",
          700: "#404932",
          800: "#2B3121",
          900: "#151811",
        },
        teal: {
          DEFAULT: "#5A8B8B",
          50: "#EFF5F5",
          100: "#DFEBEB",
          200: "#BFD7D7",
          300: "#9FC3C3",
          400: "#7FAFAF",
          500: "#5A8B8B",
          600: "#486F6F",
          700: "#365353",
          800: "#243838",
          900: "#121C1C",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;


