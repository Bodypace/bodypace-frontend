import React from "react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { AccountContext, type Account, ProvideAccount } from "@/lib/account";

export function MockAccountContext(Story: any, ctx: any) {
  const mock = ctx.parameters.accountContext;
  console.debug("mocking-account: MockAccountContext: ", { mock });
  return (
    <AccountContext.Provider value={mock}>
      <Story />
    </AccountContext.Provider>
  );
}

export function SpyAccountContext(Story: any, ctx: any) {
  const account = ProvideAccount();
  const spy: typeof account = {
    info: account.info,
    ...React.useRef({
      register: fn(async (username: string, password: string) => {
        action("register")(username, password);
        account.register(username, password);
      }),
      login: fn(async (username: string, password: string) => {
        action("login")(username, password);
        account.login(username, password);
      }),
      logout: fn(async () => {
        action("logout")();
        account.logout();
      }),
    }).current,
  };
  ctx.parameters.accountContext = spy;
  return MockAccountContext(Story, ctx);
}

export function ProvideSpiedAccount(accountInfo: Account["info"]): Account {
  return {
    info: accountInfo,
    register: fn(async (username: string, password: string) => {
      action("register")(username, password);
    }),
    login: fn(async (username: string, password: string) => {
      action("login")(username, password);
    }),
    logout: fn(async () => {
      action("logout")();
    }),
  };
}
