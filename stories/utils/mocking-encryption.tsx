import React from "react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import {
  EncryptionContext,
  type Encryption,
  ProvideEncryption,
} from "@/lib/encryption";

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
  const spy: typeof encryption = {
    personalKey: encryption.personalKey,
    ...React.useRef({
      generateNewPersonalKey: fn(async () => {
        action("generateNewPersonalKey")();
        await encryption.generateNewPersonalKey();
      }),
      importPersonalKey: fn(async (key: string) => {
        action("importPersonalKey")(key);
        await encryption.importPersonalKey(key);
      }),
      forgetPersonalKey: fn(async () => {
        action("forgetPersonalKey")();
        await encryption.forgetPersonalKey();
      }),
      encryptData: fn(async (data: ArrayBuffer) => {
        action("encryptData")(data);
        return await encryption.encryptData(data);
      }),
      decryptData: fn(async (data: ArrayBuffer) => {
        action("decryptData")(data);
        return await encryption.decryptData(data);
      }),
    }).current,
  };
  ctx.parameters.encryptionContext = spy;
  return MockEncryptionContext(Story, ctx);
}

export function ProvideSpiedEncryption(
  personalKey: Encryption["personalKey"],
): Encryption {
  return {
    personalKey,
    generateNewPersonalKey: fn(async () => {
      action("generateNewPersonalKey")();
    }),
    importPersonalKey: fn(async (key: string) => {
      action("importPersonalKey")();
    }),
    forgetPersonalKey: fn(async () => {
      action("forgetPersonalKey")();
    }),
    encryptData: fn(async (data: ArrayBuffer) => {
      action("encryptData")(data);
      return data;
    }),
    decryptData: fn(async (data: ArrayBuffer) => {
      action("decryptData")(data);
      return data;
    }),
  };
}
