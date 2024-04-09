"use client";

import React from "react";
import { getServerUrl } from "./serverInfo";
import { useEffectWithoutReruns } from "./effects";
import logger from "./logging";

export interface AccountInfo {
  id: number;
  accessToken: string;
}

export interface Account {
  info: AccountInfo | null | undefined;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const noopAccount: Account = {
  info: undefined,
  register: async (username, password) => {},
  login: async (username, password) => {},
  logout: async () => {},
};

export const AccountContext = React.createContext<Account>(noopAccount);

export async function fetchAccountInfo(): Promise<AccountInfo | null> {
  // TODO: This function is pointless because JWT already contains (or should) the user info
  // NOTE: Backend endpoint used here is also useless right now

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      logger.debug("@/lib/account: fetchAccountInfo: ", { accessToken });
      const response = await fetch(`${await getServerUrl()}/accounts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-cache",
      });
      if (response.ok) {
        const userInfo = await response.json();
        logger.debug("@/lib/account: fetchAccountInfo: ", { userInfo });
        return {
          id: userInfo.sub,
          accessToken: accessToken,
        };
      }
    } catch (error) {}
  } else {
    logger.debug("@/lib/account: fetchAccountInfo: no token");
  }

  logger.debug("@/lib/account: fetchAccountInfo: null");
  localStorage.removeItem("accessToken");
  return null;
}

export const ProvideAccount = (): Account => {
  const [accountInfo, _setUserInfo] = React.useState<
    AccountInfo | null | undefined
  >(undefined);

  const setUserInfo = (info: AccountInfo | null) => {
    logger.debug("@/lib/account: setUserInfo: ", { info });
    _setUserInfo(info);
  };

  logger.debug("@/lib/account: ProvideAccount: ", { accountInfo });

  useEffectWithoutReruns(() => {
    // TODO: this is probably bad, such fetching should be done with React Query or some other alternative
    if (accountInfo === undefined) {
      logger.debug("@/lib/account: useEffect: triggered: ", { accountInfo });
      fetchAccountInfo().then(setUserInfo);
    } else {
      logger.debug("@/lib/account: useEffect: skipped: ", { accountInfo });
    }
  }, [accountInfo]);

  const register = async (
    username: string,
    password: string,
  ): Promise<void> => {
    const response = await fetch(`${await getServerUrl()}/accounts/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-cache",
    });

    if (!response.ok) {
      const message =
        response.status === 409
          ? "Username already taken"
          : response.status === 400
            ? "Invalid username or password"
            : "Network error";

      throw new Error(message);
    }

    return await login(username, password);
  };

  const login = async (username: string, password: string): Promise<void> => {
    logger.debug("@/lib/account: login: ", { username, password });
    const response = await fetch(`${await getServerUrl()}/accounts/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-cache",
    });

    logger.debug("@/lib/account: login: response: ", { response });
    let accessToken = (await response.json()).access_token;
    if (!accessToken) {
      throw new Error("Unknown username or password");
    }

    logger.debug("@/lib/account: login: response token: ", { accessToken });

    localStorage.setItem("accessToken", String(accessToken));
    return fetchAccountInfo().then(setUserInfo);
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    return fetchAccountInfo().then(setUserInfo);
  };

  return {
    info: accountInfo,
    register,
    login,
    logout,
  };
};

export const useAccount = () => React.useContext(AccountContext);
