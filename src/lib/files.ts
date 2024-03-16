"use client";

import React from "react";
import { serverUrl } from "./constants";
import { useEffectWithoutReruns } from "./effects";
import logger from "./logging";
import { AccountInfo, useAccount } from "./account";
import { useEncryption } from "./encryption";

export interface File {
  id: number;
  name: string;
  nameDecrypted?: string;
  keys: string;
  userId: number;
}

export interface Files {
  files: File[] | undefined | "fetch-error" | "account-missing" | "decrypting";
  deleteFiles: (ids: File["id"][]) => Promise<void>;
  downloadFiles: (ids: File["id"][]) => Promise<void>;
}

export const noopFiles = {
  files: undefined,
  deleteFiles: async (ids: File["id"][]) => {},
  downloadFiles: async (ids: File["id"][]) => {},
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

export function ProvideFiles(): Files {
  const decrypted = React.useRef(false);
  const [files, _setFiles] = React.useState<Files["files"]>(undefined);
  const { info: accountInfo } = useAccount();
  const { personalKey, toBinaryFromBase64, toUnicode, decryptData } =
    useEncryption();

  const fileWithDecryptedName = async (file: File): Promise<File> => {
    let nameDecrypted: string | undefined;

    if (personalKey) {
      try {
        nameDecrypted = await toUnicode(
          await decryptData(
            await toBinaryFromBase64(file.name),
            await decryptData(await toBinaryFromBase64(file.keys)),
          ),
        );
      } catch (error) {
        // TODO: log error? flag such file so that it can be displayed in UI
        // that decryption failed (instead of being shown as encrypted)
      }
    }

    return {
      ...file,
      nameDecrypted,
    };
  };

  const filesWithDecryptedNames = async (files: File[]): Promise<File[]> => {
    return await Promise.all(files.map(fileWithDecryptedName));
  };

  const setFilesActual = (
    files: File[] | "fetch-error" | "account-missing" | "decrypting",
  ) => {
    logger.debug("@/lib/files: setFilesActual: ", { files });
    _setFiles(files);
  };

  const setFiles = (files: File[] | "fetch-error" | "account-missing") => {
    const hasElements = Array.isArray(files) && files.length > 0;
    if (hasElements && decrypted.current !== !!personalKey) {
      logger.debug("@/lib/files: setFiles: decrypting: ", {
        files,
        decrypted: decrypted.current,
        personalKey,
      });
      setFilesActual("decrypting");
      filesWithDecryptedNames(files).then((parsedFiles) => {
        setFilesActual(parsedFiles);
        decrypted.current = !!personalKey;
      });
    } else {
      logger.debug("@/lib/files: setFiles: skipping decryption: ", {
        files,
        decrypted: decrypted.current,
        personalKey,
      });
      setFilesActual(files);
    }
  };

  logger.debug("@/lib/files: ProvideFiles", { files, accountInfo });

  useEffectWithoutReruns(() => {
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
      if (decrypted.current !== !!personalKey && files !== "decrypting") {
        setFiles(files);
      } else {
        logger.debug("@/lib/files: useEffect: skipped: ", {
          files,
          accountInfo,
        });
      }
    }
  }, [files, accountInfo, personalKey]);

  const deleteFiles = async (ids: File["id"][]) => {
    if (!accountInfo) {
      throw new Error("user not logged in");
    }

    try {
      await Promise.allSettled(
        ids.map(async (id) => {
          await fetch(`${serverUrl}/documents/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accountInfo.accessToken}`,
              Accept: "application/json",
            },
            cache: "no-cache",
          });
        }),
      );
    } catch (error) {}

    const currentFiles = await fetchFiles(accountInfo);
    decrypted.current = false;
    setFiles(currentFiles);
  };

  const downloadFiles = async (ids: File["id"][]) => {
    if (!accountInfo) {
      throw new Error("user not logged in");
    }

    if (!Array.isArray(files)) {
      throw new Error("files list not available");
    }

    logger.debug("@/lib/files: downloadFiles: ", { ids });

    await Promise.all(
      ids.map(async (id) => {
        logger.debug("@/lib/files: downloadFiles: fetching: ", {
          id,
        });

        const file = files.find((file) => file.id === id);
        if (!file) {
          throw new Error("file metadata not found");
        }

        const response = await fetch(`${serverUrl}/documents/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accountInfo.accessToken}`,
            Accept: "application/json",
          },
          cache: "no-cache",
        });

        logger.debug("@/lib/files: downloadFiles: fetched: ", {
          id,
          name: file.name,
          keys: file.keys,
          response,
        });

        const blob = await response.blob();

        let name = file.name;
        let data = blob;

        if (personalKey) {
          const keysDecrypted = await decryptData(
            await toBinaryFromBase64(file.keys),
            await toBinaryFromBase64(personalKey),
          );

          name = await toUnicode(
            await decryptData(await toBinaryFromBase64(name), keysDecrypted),
          );

          data = new Blob([
            await decryptData(
              new Uint8Array(await data.arrayBuffer()),
              keysDecrypted,
            ),
          ]);
        }

        downloadBlob(data, name);

        if (!personalKey) {
          downloadBlob(new Blob([file.keys]), `${name}.keys`);
        }
      }),
    );
  };

  return {
    files,
    deleteFiles,
    downloadFiles,
  };
}

export const useFiles = () => React.useContext(FilesContext);

function downloadBlob(blob: Blob, name: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}
