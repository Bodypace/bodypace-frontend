"use client";

import React from "react";
import { ProvideFiles, FilesContext } from "@/lib/files";

export default function WithFiles({ children }: { children: React.ReactNode }) {
  const files = ProvideFiles();

  return (
    <FilesContext.Provider value={files}>{children}</FilesContext.Provider>
  );
}
