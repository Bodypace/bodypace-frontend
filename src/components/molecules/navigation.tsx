"use client";

import Logo from "../atoms/logo";
import Icon from "../icon";

export interface NavigationProps {
  status?: "key available" | "key missing";
}

export default function Navigation({ status = undefined }: NavigationProps) {
  return (
    <nav
      className="
      flex flex-row items-center justify-between w-full pr-md
      border-b-[1px] border-color-accent
      sticky top-0
      bg-color-background
    "
    >
      <a className="p-md" href="/">
        <Logo />
      </a>
      {status && (
        <div className="flex flex-row items-center gap-sm">
          <Icon
            name={
              status === "key available" ? "fa-key-solid" : "fa-shield-solid"
            }
          />
          <span className="font-brand text-sm text-color-primary">
            {status === "key available"
              ? "This browser has your personal key"
              : "Can't decrypt data, missing personal key"}
          </span>
        </div>
      )}
      <a
        className="flex self-stretch items-center px-lg font-brand text-sm text-color-primary"
        href="/account"
      >
        Online Account
      </a>
    </nav>
  );
}
