"use client";

import React from "react";

const serverUrl = "http://localhost:8080";

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
      const response = await fetch(`${serverUrl}/accounts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-cache",
      });
      const userInfo = await response.json();
      return {
        id: userInfo.sub,
        accessToken: accessToken,
      };
    } catch (error) {}
  }
  localStorage.removeItem("accessToken");
  return null;
}

export const ProvideAccount = (): Account => {
  const [accountInfo, _setUserInfo] = React.useState<
    AccountInfo | null | undefined
  >(undefined);

  const setUserInfo = (userInfo: AccountInfo | null) => {
    _setUserInfo(userInfo);
  };

  React.useEffect(() => {
    // TODO: this is bad
    if (accountInfo === undefined) {
      fetchAccountInfo().then(setUserInfo);
    }
  }, [accountInfo]);

  const register = async (
    username: string,
    password: string,
  ): Promise<void> => {
    const response = await fetch(`${serverUrl}/accounts/register`, {
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
    const response = await fetch(`${serverUrl}/accounts/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-cache",
    });

    let accessToken = (await response.json()).access_token;
    if (!accessToken) {
      throw new Error("Unknown username or password");
    }

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
