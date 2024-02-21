import React from "react";
import Button from "../../atoms/button";
import Dialog from "../../atoms/dialog";

import { useEncryption } from "@/lib/encryption";

export interface RemoveKeyDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const paragraphs = [
  "Do it only if you backed up your key somewhere else.",
  "Personal Key will be removed from this browser storage. If you did not write down your Personal Key and no other device has it, you will lose access to your files forever!",
  "We cannot restore this key for you. Your files will still be encrypted using it as they are now but you will not be able to decrypt and thus read them ever again.",
  "If you backed up your key, then this operation is fine and will cut off this browser from reading your files.",
];

export default function RemoveKeyDialog({
  open,
  setOpen,
}: RemoveKeyDialogProps) {
  const encryption = useEncryption();

  function handleRemoveKey() {
    encryption.forgetPersonalKey();
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <div className="flex flex-col items-center gap-2xl py-xl px-lg ">
        <div className="w-[576px] flex flex-col items-center gap-lg">
          <h1 className="font-brand text-xl text-color-primary text-center">
            Are you sure you want to remove your personal key?
          </h1>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-clean text-md text-color-primary text-center"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex gap-md">
          <Button text="Yes" onClick={handleRemoveKey} />
          <Button text="Cancel" onClick={() => setOpen(false)} />
        </div>
      </div>
    </Dialog>
  );
}
