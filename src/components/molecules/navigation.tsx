"use client";

import Logo from "../atoms/logo";
import Button from "../atoms/button";

export default function Navigation() {
  return (
    <nav
      className="
      flex flex-row items-center justify-between w-full pr-md
      border-b-[1px] border-color-silenced
      sticky top-0
      bg-color-primary
    "
    >
      <a className="px-md" href="/">
        <Logo small />
      </a>
      <Button text="Online Account" onClick="account" />
    </nav>
  );
}
