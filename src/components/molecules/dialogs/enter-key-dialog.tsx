import React from "react";

import Dialog from "../../atoms/dialog";
import Button from "../../atoms/button";
import TextInput from "../../atoms/text-input";

import { useEncryption } from "@/lib/encryption";

export interface EnterKeyDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function EnterKeyDialog({ open, setOpen }: EnterKeyDialogProps) {
  const [key, setKey] = React.useState("");

  const encryption = useEncryption();

  function handleSave() {
    encryption.importPersonalKey(key);
    setOpen(false);
  }

  React.useEffect(() => {
    setKey("");
  }, [open]);

  return (
    <Dialog open={open}>
      <div className="flex flex-col items-center gap-2xl py-xl px-lg">
        <header className="flex flex-col items-center gap-lg">
          <h1 className="font-brand text-xl text-color-primary">
            Enter your personal key
          </h1>
          <p className="font-clean text-md text-color-primary">
            Do not share it with anyone
          </p>
        </header>
        <div className="flex flex-col items-center gap-lg">
          <TextInput
            placeholder="enter your key here"
            value={key}
            onChange={setKey}
            narrow
          />
        </div>
        <div className="flex gap-md">
          <Button text="Save" onClick={key ? handleSave : undefined} />
          <Button text="Close" onClick={() => setOpen(false)} />
        </div>
      </div>
    </Dialog>
  );
}
