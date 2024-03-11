import { type File } from "@/lib/files";
import { fileNames } from "@scripts/fixtures/generate-files";

export const storyAccount = {
  sub: 12,
};

// NOTE: below json file was generated by running:
// `npx tsx scripts/fixtures/generate-files.ts | jq . > stories/fixtures/files.generated.json`
// to see decrypted content in terminal, run: `npx tsx scripts/fixtures/read-files.ts | jq .`
export const storyFiles: File[] = require("@fixtures/files.generated.json");

if (new Set(storyFiles.map((file) => file.name)).size !== storyFiles.length) {
  // We need to assert that because checkboxes are labelled by file names.
  // (btw. don't worry, actual backend also does not allow duplicate file names)
  throw new Error("File names are not unique");
}

export function getStoryFile(id: number): File {
  const file = storyFiles.find((file) => file.id === id);
  if (!file) {
    throw new Error(`File with id ${id} not found`);
  }
  const nameDecrypted = fileNames[id - 1];
  return {
    ...file,
    nameDecrypted,
  };
}
