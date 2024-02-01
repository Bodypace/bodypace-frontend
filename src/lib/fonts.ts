import {
  Inter,
  Patua_One,
  Poppins,
  Sometype_Mono,
  NTR,
  Redacted_Script,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const brandFont = Patua_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-brand",
});

const cleanFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-clean",
});

const technicalFont = Sometype_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-technical",
});

const plaintextFont = NTR({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-plaintext",
});

const ciphertextFont = Redacted_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-ciphertext",
});

const variables = `${brandFont.variable} ${cleanFont.variable} ${technicalFont.variable} ${plaintextFont.variable} ${ciphertextFont.variable}`;

export {
  inter,
  brandFont,
  cleanFont,
  technicalFont,
  plaintextFont,
  ciphertextFont,
  variables,
};
