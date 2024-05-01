"use client";

import React from "react";
import Auth, { ErrorDetails } from "@/components/molecules/auth";
import { useAccount } from "@/lib/account";
import { useEncryption } from "@/lib/encryption";

export default function AccountRegisterPage() {
  const account = useAccount();
  const encryption = useEncryption();

  const handleRegister = async (
    username: string,
    password: string,
  ): Promise<ErrorDetails | void> => {
    return account
      .register(username, password)
      .then(() => {
        if (!encryption.personalKey) {
          return encryption.generateNewPersonalKey();
        }
      })
      .catch((error: Error | any) => {
        const message = error.message;
        return {
          username: message.includes("username"),
          password: message.includes("password"),
          message,
        };
      });
  };

  return <Auth onSubmit={handleRegister} register />;
}
