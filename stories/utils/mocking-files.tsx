import React from "react";
import { FilesContext, ProvideFiles } from "@/lib/files";
import logger from "@/lib/logging";

export function MockFilesContext(Story: any, ctx: any) {
  const mock = ctx.parameters.filesContext;
  logger.debug("mocking-files: MockFilesContext: ", { mock });
  return (
    <FilesContext.Provider value={mock}>
      <Story />
    </FilesContext.Provider>
  );
}

export function SpyFilesContext(Story: any, ctx: any) {
  const files = ProvideFiles();
  logger.debug("mocking-files: SpyFilesContext: ", { files });
  const spy: typeof files = {
    files: files.files,
  };
  ctx.parameters.filesContext = spy;
  return MockFilesContext(Story, ctx);
}
