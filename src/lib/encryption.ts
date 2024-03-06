"use client";

import React from "react";
import sodium, { type Binary, type Base64 } from "./sodium";
export { type Binary, type Base64 } from "./sodium";
import logger from "./logging";

const storedKeyInBrowser = {
  get: () => localStorage.getItem("personalKey"),
  set: (key: string) => localStorage.setItem("personalKey", key),
  clear: () => localStorage.removeItem("personalKey"),
};

export interface Encryption {
  personalKey: Base64 | null | undefined;
  toBase64: (binaryOrUnicode: Binary | string) => Promise<Base64>;
  toBinaryFromBase64: (base64: Base64) => Promise<Binary>;
  toBinaryFromUnicode: (unicode: string) => Promise<Binary>;
  toUnicode: (binaryOrBase64: Binary | Base64) => Promise<string>;
  generateNewKey(): Promise<Base64>;
  generateNewPersonalKey: () => Promise<void>;
  importPersonalKey: (key: Base64) => Promise<void>;
  forgetPersonalKey: () => Promise<void>;
  encryptData(data: Binary, key?: Binary): Promise<Binary>;
  decryptData(data: Binary, key?: Binary): Promise<Binary>;
}

export const noopEncryption: Encryption = {
  personalKey: null,
  toBase64: async (binaryOrUnicode: Binary | string) => "",
  toBinaryFromBase64: async (base64: Base64) => new Uint8Array(),
  toBinaryFromUnicode: async (unicode: string) => new Uint8Array(),
  toUnicode: async (binaryOrBase64: Binary | Base64) => "",
  generateNewKey: async () => "",
  generateNewPersonalKey: async () => {},
  importPersonalKey: async () => {},
  forgetPersonalKey: async () => {},
  encryptData: async (data: Binary, key?: Binary) => data,
  decryptData: async (data: Binary, key?: Binary) => data,
};

export const EncryptionContext =
  React.createContext<Encryption>(noopEncryption);

export const ProvideEncryption = (): Encryption => {
  const [personalKey, _setPersonalKey] = React.useState<
    Base64 | null | undefined
  >(undefined);

  const setPersonalKey = (key: Base64 | null) => {
    logger.debug("@/lib/encryption: setPersonalKey: ", { key });
    _setPersonalKey(key);
  };

  logger.debug("@/lib/encryption: ProvideEncryption: ", { personalKey });

  // TODO: avoid rendering twice on first use

  React.useEffect(() => {
    if (personalKey === undefined) {
      logger.debug("@/lib/encryption: useEffect: loading from storage: ", {
        personalKey,
      });
      setPersonalKey(storedKeyInBrowser.get() || null);
    } else {
      if (personalKey) {
        if (personalKey !== storedKeyInBrowser.get()) {
          logger.debug("@/lib/encryption: useEffect: setting storage: ", {
            personalKey,
          });
          storedKeyInBrowser.set(personalKey);
        } else {
          logger.debug(
            "@/lib/encryption: useEffect: setting storage skipped: ",
            { personalKey },
          );
        }
      } else {
        logger.debug("@/lib/encryption: useEffect: clearing storage: ", {
          personalKey,
        });
        storedKeyInBrowser.clear();
      }
    }
  }, [personalKey]);

  const toBase64 = sodium.toBase64;
  const toBinaryFromBase64 = sodium.toBinaryFromBase64;
  const toBinaryFromUnicode = sodium.toBinaryFromUnicode;
  const toUnicode = sodium.toUnicode;

  const generateNewKey = async () => {
    return await sodium.generateKey();
  };

  const generateNewPersonalKey = async () => {
    const key = await generateNewKey();
    setPersonalKey(key);
  };

  const importPersonalKey = async (key: Base64) => {
    setPersonalKey(key);
  };

  const forgetPersonalKey = async () => {
    setPersonalKey(null);
  };

  const encryptData = async (data: Binary, key?: Binary) => {
    if (!key) {
      if (!personalKey) throw new Error("No personal key");
      key = await toBinaryFromBase64(personalKey);
    }
    return await sodium.encryptData(data, key);
  };

  const decryptData = async (data: Binary, key?: Binary) => {
    if (!key) {
      if (!personalKey) throw new Error("No personal key");
      key = await toBinaryFromBase64(personalKey);
    }
    return await sodium.decryptData(data, key);
  };

  return {
    personalKey,
    toBase64,
    toBinaryFromBase64,
    toBinaryFromUnicode,
    toUnicode,
    generateNewKey,
    generateNewPersonalKey,
    importPersonalKey,
    forgetPersonalKey,
    encryptData,
    decryptData,
  };
};

export const useEncryption = () => React.useContext(EncryptionContext);
