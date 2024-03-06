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
import logger from "@/lib/logging";

// NOTE: in tests if possible use the SpyXContext instead of using MockXContext directly.
// This way we also test the actual behaviour of libraries which provide real production
// contexts and functionalities, and which do not have their own separate tests.

export function MockEncryptionContext(Story: any, ctx: any) {
  const mock = ctx.parameters.encryptionContext;
  logger.debug("mocking-encryption: MockEncryptionContext: ", {
    mock: {
      ...mock,
      personalKey: mock.personalKey, // clone value to not be mutated in console logs
    },
  });
  return (
    <EncryptionContext.Provider value={mock}>
      <Story />
    </EncryptionContext.Provider>
  );
}

export function SpyEncryptionContext(Story: any, ctx: any) {
  const encryption = ProvideEncryption();
  logger.debug("mocking-encryption: SpyEncryptionContext: ", { encryption });

  const spy = React.useRef<Encryption>({
    personalKey: encryption.personalKey,
    toBase64: fn(),
    toBinaryFromBase64: fn(),
    toBinaryFromUnicode: fn(),
    toUnicode: fn(),
    generateNewKey: fn(),
    generateNewPersonalKey: fn(),
    importPersonalKey: fn(),
    forgetPersonalKey: fn(),
    encryptData: fn(),
    decryptData: fn(),
  });

  spy.current.personalKey = encryption.personalKey;

  // NOTE: we are not reporting actions here, because Files component
  // stories call below function many times and actions slow them down.
  // I tried changing action { depth } and not passing arguments at all,
  // but it still slowed down the tests a lot, exceeds timeouts and makes
  // entire UI laggy.
  (spy.current.toBase64 as any).mockImplementation(encryption.toBase64);
  (spy.current.toBinaryFromBase64 as any).mockImplementation(
    encryption.toBinaryFromBase64,
  );
  (spy.current.toBinaryFromUnicode as any).mockImplementation(
    encryption.toBinaryFromUnicode,
  );
  (spy.current.toUnicode as any).mockImplementation(encryption.toUnicode);
  (spy.current.generateNewKey as any).mockImplementation(
    encryption.generateNewKey,
  );
  (spy.current.generateNewPersonalKey as any).mockImplementation(
    encryption.generateNewPersonalKey,
  );
  (spy.current.importPersonalKey as any).mockImplementation(
    encryption.importPersonalKey,
  );
  (spy.current.forgetPersonalKey as any).mockImplementation(
    encryption.forgetPersonalKey,
  );
  (spy.current.encryptData as any).mockImplementation(encryption.encryptData);
  (spy.current.decryptData as any).mockImplementation(encryption.decryptData);

  ctx.parameters.encryptionContext = spy.current;
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
