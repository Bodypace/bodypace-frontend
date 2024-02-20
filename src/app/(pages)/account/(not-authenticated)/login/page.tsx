"use client";

import React from "react";
import Auth, { ErrorDetails } from "@/components/molecules/auth";
import { useAccount } from "@/lib/account";

export default function AccountLoginPage() {
  const account = useAccount();

  const handleLogin = async (
    username: string,
    password: string,
  ): Promise<ErrorDetails | void> => {
    return account.login(username, password).catch((error: Error | any) => {
      const message = error.message;
      return {
        username: message.includes("username"),
        password: message.includes("password"),
        message,
      };
    });
  };

  return <Auth onSubmit={handleLogin} />;
}
