"use client";

import { useAccount } from "@/lib/account";
import { redirect } from "next/navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = useAccount();

  if (!account.info) {
    redirect("/account/login");
  }

  return children;
}
