import {
  Inter,
  Patua_One,
  Poppins,
  // Sometype_Mono, // available in Next 14
  // We use Red_Hat_Mono font because Next 13 does not have Sometype_Mono
  Red_Hat_Mono,
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

// TODO: after upgrading to Next 14, use Sometype_Mono
// const technicalFont = Sometype_Mono({
const technicalFont = Red_Hat_Mono({
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
