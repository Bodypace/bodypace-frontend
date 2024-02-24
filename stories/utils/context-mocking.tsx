import React from "react";
import { EncryptionContext, noopEncryption } from "@/lib/encryption";
import { AccountContext, noopAccount } from "@/lib/account";

type WithMockProp<Props, propName extends string, ContextContent> = Props & {
  [K in propName]?: Partial<ContextContent>;
};

export function addContextMocking<
  mockPropName extends string,
  ContextContent,
  Props,
>(
  Component: React.FC<Props>,
  Context: React.Context<ContextContent>,
  newKey: mockPropName,
  defaultMock: ContextContent,
): React.FC<WithMockProp<Props, typeof newKey, ContextContent>> {
  return function WithMockedContext(
    props: WithMockProp<Props, mockPropName, ContextContent>,
  ): React.ReactNode {
    const { [newKey]: mock, ...componentProps } = props;
    return (
      <Context.Provider
        value={{
          ...defaultMock,
          ...(mock ? mock : {}),
        }}
      >
        {/* TODO: get rid of the any, write proper TypeScript */}
        <Component {...(componentProps as any)} />
      </Context.Provider>
    );
  };
}

export function addEncryptionMocking<Props>(Component: React.FC<Props>) {
  return addContextMocking(
    Component,
    EncryptionContext,
    "mockedEncryption",
    noopEncryption,
  );
}

export function addAccountMocking<Props>(Component: React.FC<Props>) {
  return addContextMocking(
    Component,
    AccountContext,
    "mockedAccount",
    noopAccount,
  );
}
