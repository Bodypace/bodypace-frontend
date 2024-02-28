import React from "react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { http, HttpResponse } from "msw";
import {
  AccountContext,
  noopAccount,
  type Account,
  ProvideAccount,
} from "@/lib/account";
import { addContextMocking } from "./mocking-context";

export function addAccountMocking<Props>(Component: React.FC<Props>) {
  return addContextMocking(
    Component,
    AccountContext,
    "mockedAccount",
    noopAccount,
  );
}

export function ProvideAccountActions(accountInfo: Account["info"]): Account {
  return {
    info: accountInfo,
    register: action("register") as any,
    login: action("login") as any,
    logout: action("logout") as any,
  };
}

export function SpyAccountContext(Story: any, ctx: any) {
  const account = ProvideAccount();
  const spy = {
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

  return (
    <AccountContext.Provider value={spy}>
      <Story />
    </AccountContext.Provider>
  );
}

export function ProvideAccountConnectedToActions(Story: any, ctx: any) {
  const firstRender = React.useRef(true);
  if (firstRender.current) {
    localStorage.setItem("accessToken", ctx.args.mockedAccount.accessToken);
    ctx.parameters.msw = {
      handlers: [
        http.get("http://localhost:8080/accounts", () => {
          return HttpResponse.json({
            sub: ctx.args.mockedAccount.info.id,
          });
        }),
      ],
    };
    firstRender.current = false;
  }

  const account = ProvideAccount();

  // we assume these are Storybook actions (e.g. come from ProvideAccountActions())
  const mockedAccount: Account = ctx.args.mockedAccount;
  const actions = {
    register: mockedAccount.register,
    login: mockedAccount.login,
    logout: mockedAccount.logout,
  };

  ctx.args.mockedAccount = {
    info: account.info,
    ...React.useRef({
      register: fn((username: string, password: string) => {
        actions.register(username, password);
        account.register(username, password);
      }),
      login: fn((username: string, password: string) => {
        actions.login(username, password);
        account.login(username, password);
      }),
      logout: fn(() => {
        actions.logout();
        account.logout();
      }),
    }).current,
  };

  return <Story {...ctx} />;
}
