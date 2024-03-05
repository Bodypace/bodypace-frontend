import React from "react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import {
  EncryptionContext,
  ProvideEncryption,
  type Encryption,
  type Base64,
  type Binary,
} from "@/lib/encryption";

// NOTE: in tests if possible use the SpyXContext instead of using MockXContext directly.
// This way we also test the actual behaviour of libraries which provide real production
// contexts and functionalities, and which do not have their own separate tests.

export function MockEncryptionContext(Story: any, ctx: any) {
  const mock = ctx.parameters.encryptionContext;
  console.debug("mocking-encryption: MockEncryptionContext: ", { mock });
  return (
    <EncryptionContext.Provider value={mock}>
      <Story />
    </EncryptionContext.Provider>
  );
}

export function SpyEncryptionContext(Story: any, ctx: any) {
  const encryption = ProvideEncryption();
  console.debug("mocking-encryption: SpyEncryptionContext: ", { encryption });

  const spiedFunctions: (keyof Encryption)[] = [
    "toBase64",
    "toBinaryFromBase64",
    "toBinaryFromUnicode",
    "toUnicode",
    "generateNewKey",
    "generateNewPersonalKey",
    "importPersonalKey",
    "forgetPersonalKey",
    "encryptData",
    "decryptData",
  ];

  if (!ctx.parameters.mockedEncryption) {
    ctx.parameters.mockedEncryption = {};
  }

  const spy = ctx.parameters.mockedEncryption;
  spy.personalKey = encryption.personalKey;

  for (const funcName of spiedFunctions) {
    const fnFunction =
      spy?.[funcName]?._isMockFunction === true ? spy[funcName] : fn();

    fnFunction.mockImplementation(async (...args: any[]) => {
      action(funcName)(...args);
      return await (encryption[funcName] as any)(...args);
    });

    spy[funcName] = fnFunction;
  }

  ctx.parameters.encryptionContext = spy;
  return MockEncryptionContext(Story, ctx);
}

export function ProvideSpiedEncryption(
  personalKey: Encryption["personalKey"],
): Encryption {
  return {
    personalKey,
    toBase64: fn(async (binaryOrUnicode: Binary | string) => {
      action("toBase64")(binaryOrUnicode);
      return "";
    }),
    toBinaryFromBase64: fn(async (base64: Base64) => {
      action("toBinaryFromBase64")(base64);
      return new Uint8Array();
    }),
    toBinaryFromUnicode: fn(async (unicode: string) => {
      action("toBinaryFromUnicode")(unicode);
      return new Uint8Array();
    }),
    toUnicode: fn(async (binaryOrBase64: Binary | Base64) => {
      action("toUnicode")(binaryOrBase64);
      return "";
    }),
    generateNewKey: fn(async () => {
      action("generateNewKey")();
      return "";
    }),
    generateNewPersonalKey: fn(async () => {
      action("generateNewPersonalKey")();
    }),
    importPersonalKey: fn(async (key: Base64) => {
      action("importPersonalKey")();
    }),
    forgetPersonalKey: fn(async () => {
      action("forgetPersonalKey")();
    }),
    encryptData: fn(async (data: Binary, key?: Binary) => {
      action("encryptData")(data, key);
      return data;
    }),
    decryptData: fn(async (data: Binary, key?: Binary) => {
      action("decryptData")(data, key);
      return data;
    }),
  };
}
