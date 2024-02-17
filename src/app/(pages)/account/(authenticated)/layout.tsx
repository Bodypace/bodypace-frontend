"use client";

import { useAccount } from "@/lib/auth";
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
