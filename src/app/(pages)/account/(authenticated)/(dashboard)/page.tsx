"use client";

import React from "react";
import Button from "@/components/atoms/button";
import { FilePicker } from "@/components/atoms/file-picker";
import { useFiles, type FileMetadata } from "@/lib/files";
import { Files } from "@/components/organisms/files";
import { useEncryption } from "@/lib/encryption";

export default function AccountPage() {
  const filePickerRef = React.useRef<HTMLInputElement>(null);

  const { personalKey } = useEncryption();
  const { files, deleteFiles, downloadFiles, uploadFiles } = useFiles();
  const [selection, setSelection] = React.useState<Set<FileMetadata["id"]>>(
    new Set(),
  );
  const selectedFilesCount = selection.size;

  function handleSelect(id: FileMetadata["id"], selected: boolean) {
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

  function handleUploadNewFile() {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  }

  function handleFilesPicked(fileList: FileList | null) {
    if (fileList && fileList.length) {
      uploadFiles(Array.from(fileList));
    }
  }

  function handleDownloadFile() {
    downloadFiles(Array.from(selection)).then(() => {
      setSelection(new Set());
    });
  }

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
          <Button
            text="Upload new file"
            wide
            onClick={!!personalKey ? handleUploadNewFile : undefined}
          />
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
      <FilePicker ref={filePickerRef} onFilesPicked={handleFilesPicked} />
    </div>
  );
}
