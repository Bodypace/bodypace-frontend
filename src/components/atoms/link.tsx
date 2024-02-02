"use client";

import React from "react";

export interface LinkProps {
  text: string;
  href: string;
}

export default function Link({ text, href }: LinkProps) {
  return (
    <a
      className="font-brand text-newDSmd text-color-primary underline hover:no-underline "
      href={href}
    >
      {text}
    </a>
  );
}
