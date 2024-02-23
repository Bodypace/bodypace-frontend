"use client";

import React from "react";

// TODO: use CryptoKey

const storedKeyInBrowser = {
  get: () => localStorage.getItem("personalKey"),
  set: (key: string) => localStorage.setItem("personalKey", key),
  clear: () => localStorage.removeItem("personalKey"),
};

export interface Encryption {
  personalKey: string | null | undefined;
  generateNewPersonalKey: () => Promise<void>;
  importPersonalKey: (key: string) => Promise<void>;
  forgetPersonalKey: () => Promise<void>;
  encryptData: (data: ArrayBuffer) => Promise<ArrayBuffer>;
  decryptData: (data: ArrayBuffer) => Promise<ArrayBuffer>;
}

export const noopEncryption: Encryption = {
  personalKey: null,
  generateNewPersonalKey: async () => {},
  importPersonalKey: async () => {},
  forgetPersonalKey: async () => {},
  encryptData: async (data: ArrayBuffer) => data,
  decryptData: async (data: ArrayBuffer) => data,
};

export const EncryptionContext =
  React.createContext<Encryption>(noopEncryption);

export const ProvideEncryption = (): Encryption => {
  const [personalKey, setPersonalKey] = React.useState<
    string | null | undefined
  >(undefined);

  // TODO: avoid rendering twice on first use

  React.useEffect(() => {
    if (personalKey === undefined) {
      setPersonalKey(storedKeyInBrowser.get() || null);
    } else {
      if (personalKey) {
        storedKeyInBrowser.set(personalKey);
      } else {
        storedKeyInBrowser.clear();
      }
    }
  }, [personalKey]);

  const generateNewPersonalKey = async () => {
    setPersonalKey("random key 4242");
  };
  const importPersonalKey = async (key: string) => {
    setPersonalKey(key);
  };
  const forgetPersonalKey = async () => {
    setPersonalKey(null);
  };
  const encryptData = async (data: ArrayBuffer) => data;
  const decryptData = async (data: ArrayBuffer) => data;

  return {
    personalKey,
    generateNewPersonalKey,
    importPersonalKey,
    forgetPersonalKey,
    encryptData,
    decryptData,
  };
};

export const useEncryption = () => React.useContext(EncryptionContext);
