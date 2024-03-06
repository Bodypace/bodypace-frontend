import { readFile } from "fs/promises";
import { type File } from "@/lib/files";
import {
  toBase64,
  toBinaryFromBase64,
  toUnicode,
  decryptData,
} from "@/lib/sodium";
import { storyFiles } from "@fixtures/files";
import mockedKey from "@fixtures/personal-key";

async function decryptFiles(encryptedFiles: File[]) {
  const decryptedFiles: File[] = await Promise.all(
    encryptedFiles.map(async (file: File) => {
      const keys = await toBase64(
        await decryptData(
          await toBinaryFromBase64(file.keys),
          await toBinaryFromBase64(mockedKey.base64),
        ),
      );

      const name = await toUnicode(
        await decryptData(
          await toBinaryFromBase64(file.name),
          await toBinaryFromBase64(keys),
        ),
      );

      return {
        ...file,
        name,
        keys,
        nameDecrypted: `debug: keys field decrypted with personal key: ${atob(
          keys,
        )}`,
      };
    }),
  );

  console.log(JSON.stringify(decryptedFiles));
}

async function readMockedFiles(path: string) {
  const encryptedFiles: File[] = JSON.parse(await readFile(path, "utf8"));

  await decryptFiles(encryptedFiles);
}

if (process.argv.length > 2) {
  readMockedFiles(process.argv[2]);
} else {
  decryptFiles(storyFiles);
}
