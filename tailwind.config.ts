import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    textColor: ({ theme }) => ({
      color: {
        primary: theme("colors.color.grey.900"),
        silenced: theme("colors.color.grey.600"),
      },
    }),
    borderColor: ({ theme }) => ({
      color: {
        primary: theme("colors.color.grey.900"),
        silenced: theme("colors.color.grey.400"),
        accent: theme("colors.color.blue.14"),
        warning: theme("colors.color.orange.14"),
      },
    }),
    backgroundColor: ({ theme }) => ({
      // this is "surface" in Figma
      color: {
        primary: theme("colors.color.grey.0"),
        silenced: theme("colors.color.grey.0"),
        focus: theme("colors.color.grey.50"),
        accent: theme("colors.color.blue.4"),
        warning: theme("colors.color.orange.4"),
      },
    }),
    gap: ({ theme }) => ({
      none: "0rem",
      xs: theme("spacing.space-05"),
      sm: theme("spacing.space-1"),
      md: theme("spacing.space-3"),
      lg: theme("spacing.space-4"),
      xl: theme("spacing.space-6"),
      "2xl": theme("spacing.space-13"),
    }),
    padding: ({ theme }) => theme("gap"),
    borderRadius: ({ theme }) => ({
      minimal: theme("spacing.radius-sm"),
      rounded: theme("spacing.radius-md"),
      full: theme("spacing.radius-3xl"),
    }),
    fontSize: {
      "2xs": "0.64rem",
      xs: "0.8rem",
      sm: "1rem",
      md: "1.25rem",
      lg: "1.563rem",
      xl: "1.953rem",
      "2xl": "2.441rem",
      "3xl": "3.052rem",
    },
    fontWeight: {
      regular: defaultTheme.fontWeight.normal,
      ...defaultTheme.fontWeight,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        color: {
          grey: {
            0: "#ffffff",
            50: "#f1f1f1",
            200: "#d3d3d3",
            400: "#afafaf",
            600: "#7c7c7c",
            800: "#343434",
            900: "#202020",
          },
          red: {
            14: "#f55555",
            13: "#f66262",
            12: "#f86f6f",
            11: "#f77a7a",
            10: "#f88787",
            9: "#f99393",
            8: "#f99f9f",
            7: "#faabab",
            6: "#fbb7b7",
            5: "#fbc3c3",
            4: "#fccfcf",
            3: "#fddbdb",
            2: "#fee7e7",
            1: "#fef3f3",
          },
          blue: {
            14: "#56c0f5",
            13: "#62c5f6",
            12: "#6ec9f7",
            11: "#7acef7",
            10: "#87d2f8",
            9: "#93d7f9",
            8: "#9fdbf9",
            7: "#abe0fa",
            6: "#b7e4fb",
            5: "#c3e9fb",
            4: "#cfedfc",
            3: "#dbf2fd",
            2: "#e7f6fe",
            1: "#f3fbfe",
          },
          orange: {
            14: "#f5c056",
            13: "#f6c562",
            12: "#f7c96e",
            11: "#f7ce7a",
            10: "#f8d287",
            9: "#f9d793",
            8: "#f9db9f",
            7: "#fae0ab",
            6: "#fbe4b7",
            5: "#fbe9c3",
            4: "#fcedcf",
            3: "#fdf2db",
            2: "#fef6e7",
            1: "#fefbf3",
          },
        },
      },
      spacing: {
        "space-05": "0.25rem",
        "space-1": "0.5rem",
        "space-2": "1rem",
        "space-3": "1.5rem",
        "space-4": "2rem",
        "space-5": "2.5rem",
        "space-6": "3rem",
        "space-7": "3.5rem",
        "space-8": "4rem",
        "space-9": "4.5rem",
        "space-10": "5rem",
        "space-11": "5.5rem",
        "space-12": "6rem",
        "space-13": "6.5rem",

        "radius-sm": "0.25rem",
        "radius-md": "0.5rem",
        "radius-lg": "1rem",
        "radius-xl": "2rem",
        "radius-2xl": "8rem",
        "radius-3xl": "22.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
