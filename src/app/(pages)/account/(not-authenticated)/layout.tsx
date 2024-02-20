"use client";

import { useAccount } from "@/lib/account";
import { redirect } from "next/navigation";

export default function NotAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = useAccount();

  if (account.info) {
    redirect("/account");
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-2xl pt-2xl">
      <h1 className="font-brand text-xl text-color-primary">Account</h1>
      {children}
    </div>
  );
}
