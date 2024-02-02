"use client";

import Link from "../atoms/link";

export default function Footer() {
  return (
    <footer
      className="
      flex flex-row justify-center items-center
      w-full gap-xl py-xl
      border-t-[1px] border-color-silenced border-dashed
    "
    >
      <Link text="Terms and Conditions" href="terms-and-conditions" />
      <Link text="Privacy Policy" href="privacy-policy" />
    </footer>
  );
}
