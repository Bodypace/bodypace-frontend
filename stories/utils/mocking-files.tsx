import React from "react";
import { FilesContext, ProvideFiles, type File, type Files } from "@/lib/files";
import logger from "@/lib/logging";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";

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

  const spy = React.useRef<Files>({
    files: files.files,
    deleteFiles: fn(),
  });

  spy.current.files = files.files;
  (spy.current.deleteFiles as any).mockImplementation(
    async (ids: File["id"][]) => {
      action("deleteFiles")(ids);
      return await files.deleteFiles(ids);
    },
  );

  ctx.parameters.filesContext = spy.current;
  return MockFilesContext(Story, ctx);
}
