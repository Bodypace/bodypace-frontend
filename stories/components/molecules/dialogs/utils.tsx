import React from "react";
import {
  EncryptionContext,
  noopEncryption,
  type Encryption,
} from "@/lib/encryption";

export type WithEncryptionMock<Props> = Props & {
  mockedEncryption?: Partial<Encryption>;
};

export function mockEncryptionContext<Props>(
  Component: React.FC<Props>,
): React.FC<WithEncryptionMock<Props>> {
  function WithMockedEncryptionContext(
    props: WithEncryptionMock<Props>,
  ): React.ReactNode {
    const { mockedEncryption, ...componentProps } = props;
    return (
      <EncryptionContext.Provider
        value={{
          ...noopEncryption,
          ...(mockedEncryption ? mockedEncryption : {}),
        }}
      >
        {/* TODO: get rid of the any, write proper TypeScript */}
        <Component {...(componentProps as any)} />
      </EncryptionContext.Provider>
    );
  }
  return WithMockedEncryptionContext;
}
