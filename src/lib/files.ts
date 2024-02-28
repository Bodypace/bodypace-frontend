"use client";

import React from "react";
import { serverUrl } from "./constants";
import logger from "./logging";
import { AccountInfo, useAccount } from "./account";

export interface File {
  id: number;
  name: string;
  keys: string;
  userId: number;
}

export interface Files {
  files: File[] | undefined | "fetch-error" | "account-missing";
}

export const noopFiles = {
  files: undefined,
};

export const FilesContext = React.createContext<Files>(noopFiles);

async function fetchFiles(
  accountInfo: AccountInfo,
): Promise<File[] | "fetch-error"> {
  try {
    logger.debug("@/lib/files: fetchFiles: ", { accountInfo });

    const response = await fetch(`${serverUrl}/documents`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accountInfo.accessToken}`,
        Accept: "application/json",
      },
      cache: "no-cache",
    });

    // TODO: validate that
    const files: File[] = await response.json();

    logger.debug("@/lib/files: fetchFiles: ", { files });

    return files;
  } catch (error) {
    logger.debug("@/lib/files: fetchFiles: error: ", { error });
    return "fetch-error";
  }
}

export function ProvideFiles() {
  const [files, _setFiles] = React.useState<Files["files"]>(undefined);
  const { info: accountInfo } = useAccount();

  const setFiles = (files: File[] | "fetch-error" | "account-missing") => {
    logger.debug("@/lib/files: setFiles: ", { files });
    _setFiles(files);
  };

  logger.debug("@/lib/files: ProvideFiles", { files, accountInfo });

  React.useEffect(() => {
    if (files === undefined) {
      logger.debug("@/lib/files: useEffect: triggered: ", {
        files,
        accountInfo,
      });
      if (accountInfo?.accessToken) {
        fetchFiles(accountInfo).then(setFiles);
      }
      if (accountInfo === null) {
        setFiles("account-missing");
      }
    } else {
      logger.debug("@/lib/files: useEffect: skipped: ", {
        files,
        accountInfo,
      });
    }
  }, [files, accountInfo]);

  return {
    files,
  };
}

export const useFiles = () => React.useContext(FilesContext);
