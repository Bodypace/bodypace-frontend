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
      <Link text="Terms and Conditions" small target="terms-and-conditions" />
      <Link text="Privacy Policy" small target="privacy-policy" />
      {/* <Link text="About Us" small target="about-us" /> */}
    </footer>
  );
}
