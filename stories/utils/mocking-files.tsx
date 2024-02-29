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
  const spy: typeof files = {
    files: files.files,
  };
  ctx.parameters.filesContext = spy;
  return MockFilesContext(Story, ctx);
}
