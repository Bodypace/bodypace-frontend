"use client";

import React from "react";

type TargetCallback = () => any;

export interface LinkProps {
  text: string;
  target?: string | TargetCallback;
  small?: boolean;
}

export default function Link({ text, target, small }: LinkProps) {
  if (target && typeof target === "string") {
    return (
      <a
        data-small={small}
        className="
        font-regular text-md data-[small=true]:text-sm
        text-color-primary
        underline hover:no-underline 
      "
        href={target as string}
      >
        {text}
      </a>
    );
  }

  return (
    <span
      data-small={small}
      data-disabled={!target}
      className="
          font-regular text-md data-[small=true]:text-sm
          text-color-primary data-[disabled=true]:text-color-silenced 
          underline data-[disabled=false]:hover:no-underline 
          hover:cursor-pointer data-[disabled=true]:hover:cursor-default
          select-none
        "
      role={target ? "button" : undefined}
      onClick={target as TargetCallback}
    >
      {text}
    </span>
  );
}
