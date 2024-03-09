"use client";

import React from "react";
import Button from "@/components/atoms/button";
import { useFiles, type File } from "@/lib/files";
import { Files } from "@/components/organisms/files";

export default function AccountPage() {
  const { files, deleteFiles } = useFiles();
  const [selection, setSelection] = React.useState<Set<File["id"]>>(new Set());
  const selectedFilesCount = selection.size;

  function handleSelect(id: File["id"], selected: boolean) {
    if (selected) {
      selection.add(id);
      setSelection(new Set(selection));
    } else {
      selection.delete(id);
      setSelection(new Set(selection));
    }
  }

  function handleClearSelection() {
    setSelection(new Set());
  }

  function handleUploadNewFile() {}

  function handleDownloadFile() {}

  function handleDeleteFile() {
    deleteFiles(Array.from(selection)).then(() => {
      setSelection(new Set());
    });
  }

  return (
    <div className="flex flex-1 justify-center">
      <div className="flex flex-col items-center gap-xl px-2xl pt-xl">
        <span className="font-brand text-xl text-color-primary">
          Your files
        </span>
        <div className="flex flex-col items-center gap-lg">
          <Button text="Upload new file" wide onClick={handleUploadNewFile} />
          <Button text="Settings" wide onClick="/account/settings" />
        </div>
        {files?.length ? (
          <>
            <span className="font-technical text-lg text-color-primary">
              Selected {selectedFilesCount}{" "}
              {selectedFilesCount === 1 ? "file" : "files"}
            </span>
            <div className="flex flex-col items-center gap-lg">
              <Button
                text="Download"
                wide
                onClick={selectedFilesCount ? handleDownloadFile : undefined}
              />
              <Button
                text="Remove"
                wide
                onClick={selectedFilesCount ? handleDeleteFile : undefined}
              />
            </div>
          </>
        ) : undefined}
      </div>
      <div className="flex pt-lg">
        <Files
          selected={selection}
          onSelected={handleSelect}
          onClearSelection={handleClearSelection}
        />
      </div>
    </div>
  );
}
