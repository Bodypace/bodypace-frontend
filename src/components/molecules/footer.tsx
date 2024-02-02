"use client";

import Link from "../atoms/link";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center items-center w-full gap-newDSxl py-newDSxl">
      <Link text="Terms and Conditions" href="terms-and-conditions" />
      <Link text="Privacy Policy" href="privacy-policy" />
      <Link text="Source Code" href="https://github.com/Bodypace" />
    </footer>
  );
}
