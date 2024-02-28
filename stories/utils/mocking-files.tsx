import React from "react";
import { FilesContext, ProvideFiles } from "@/lib/files";

export function MockFilesContext(Story: any, ctx: any) {
  const mock = ctx.parameters.filesContext;
  console.debug("mocking-files: MockFilesContext: ", { mock });
  return (
    <FilesContext.Provider value={mock}>
      <Story />
    </FilesContext.Provider>
  );
}

export function SpyFilesContext(Story: any, ctx: any) {
  const files = ProvideFiles();
  const spy = {
    files: files.files,
  };
  return (
    <FilesContext.Provider value={spy}>
      <Story />
    </FilesContext.Provider>
  );
}
