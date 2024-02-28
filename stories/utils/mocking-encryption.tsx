import React from "react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import {
  EncryptionContext,
  noopEncryption,
  type Encryption,
  ProvideEncryption,
} from "@/lib/encryption";
import { addContextMocking } from "./mocking-context";

export function addEncryptionMocking<Props>(Component: React.FC<Props>) {
  return addContextMocking(
    Component,
    EncryptionContext,
    "mockedEncryption",
    noopEncryption,
  );
}

export function MockEncryptionContext(Story: any, ctx: any) {
  const mock = ctx.parameters.encryptionContext;
  return (
    <EncryptionContext.Provider value={mock}>
      <Story />
    </EncryptionContext.Provider>
  );
}

export function ProvideEncryptionActions(
  personalKey: Encryption["personalKey"],
): Encryption {
  return {
    personalKey,
    generateNewPersonalKey: action("generateNewPersonalKey") as any,
    importPersonalKey: action("importPersonalKey") as any,
    forgetPersonalKey: action("forgetPersonalKey") as any,
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

export function ProvideEncryptionConnectedToActions(Story: any, ctx: any) {
  const firstRender = React.useRef(true);
  if (firstRender.current) {
    localStorage.setItem("personalKey", ctx.args.mockedEncryption.personalKey);
    firstRender.current = false;
  }

  const encryption = ProvideEncryption();

  // we assume these are Storybook actions (e.g. come from ProvideEncryptionActions())
  const mockedEncryption: Encryption = ctx.args.mockedEncryption;
  const actions = {
    generateNewPersonalKey: mockedEncryption.generateNewPersonalKey,
    importPersonalKey: mockedEncryption.importPersonalKey,
    forgetPersonalKey: mockedEncryption.forgetPersonalKey,
    encryptData: mockedEncryption.encryptData,
    decryptData: mockedEncryption.decryptData,
  };

  ctx.args.mockedEncryption = {
    personalKey: encryption.personalKey,
    ...React.useRef({
      generateNewPersonalKey: fn(() => {
        actions.generateNewPersonalKey();
        encryption.generateNewPersonalKey();
      }),
      importPersonalKey: fn((key: string) => {
        actions.importPersonalKey(key);
        encryption.importPersonalKey(key);
      }),
      forgetPersonalKey: fn(() => {
        actions.forgetPersonalKey();
        encryption.forgetPersonalKey();
      }),
      encryptData: fn((data: ArrayBuffer) => {
        actions.encryptData(data);
        return encryption.encryptData(data);
      }),
      decryptData: fn((data: ArrayBuffer) => {
        actions.decryptData(data);
        return encryption.decryptData(data);
      }),
    }).current,
  };

  return Story();
}
