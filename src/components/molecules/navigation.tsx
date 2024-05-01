"use client";

import Logo from "../atoms/logo";
import Icon from "../icon";

export interface NavigationProps {
  keyAvailable?: boolean;
}

export default function Navigation({
  keyAvailable = undefined,
}: NavigationProps) {
  // block
  return (
    <nav
      className="
      flex flex-row items-center justify-between
      w-full pr-md
      border-b-[1px] border-color-accent
      sticky top-0
      bg-color-background
    "
    >
      <div className="flex flex-1 mr-auto flex-row items-center ">
        <a className="p-md" href="/">
          <Logo />
        </a>
        <p
          className="font-technical py-xs px-sm rounded-rounded bg-color-warning max-w-sm border-[1px] border-color-accent select-none"
          translate="no"
        >
          free beta
        </p>
      </div>
      {keyAvailable !== undefined && (
        <div className="flex flex-1 flex-row items-center justify-center gap-sm ">
          <Icon name={keyAvailable ? "fa-key-solid" : "fa-shield-solid"} />
          <span className="font-brand text-sm text-color-primary">
            {keyAvailable
              ? "This browser has your personal key"
              : "Can't decrypt data, missing personal key"}
          </span>
        </div>
      )}
      <a
        className="flex flex-1 flex-row-reverse ml-auto items-center"
        href="/account"
      >
        <span className="pr-lg font-brand text-sm text-color-primary">
          Online Account
        </span>
      </a>
    </nav>
  );
}
