"use client";

import React from "react";
import { ProvideAccount, AccountContext } from "@/lib/auth";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = ProvideAccount();

  if (account.info === undefined) {
    return <></>;
  }

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
}
