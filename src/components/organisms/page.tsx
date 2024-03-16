"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Navigation from "../molecules/navigation";
import Footer from "../molecules/footer";

import { useEncryption } from "@/lib/encryption";

export default function Page({ children }: { children: React.ReactNode }) {
  const encryption = useEncryption();
  const pathname = usePathname();

  let keyAvailable: boolean | undefined;

  if (
    pathname !== "/" &&
    pathname !== "/terms-and-conditions" &&
    pathname !== "/privacy-policy" &&
    encryption.personalKey !== undefined
  ) {
    keyAvailable = !!encryption.personalKey;
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-color-background">
      <Navigation keyAvailable={keyAvailable} />
      <main className="flex flex-1 flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
