import React from "react";
import Checkbox from "../../atoms/checkbox";
import Button from "../../atoms/button";
import Dialog from "../../atoms/dialog";

import { useEncryption } from "@/lib/encryption";

export interface ShowKeyOverlayProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function ShowKeyDialog({ open, setOpen }: ShowKeyOverlayProps) {
  const [keyVisible, setKeyVisible] = React.useState(false);

  const encryption = useEncryption();

  React.useEffect(() => {
    setKeyVisible(false);
  }, [open]);

  return (
    <Dialog open={open}>
      <div className="w-[567px] flex flex-col items-center gap-2xl py-xl px-lg">
        <header className="flex flex-col items-center gap-lg">
          <h1 className="font-brand text-xl text-color-primary">
            This is your personal key
          </h1>
          <p className="font-clean text-md text-color-primary">
            Do not share it with anyone
          </p>
        </header>
        <div className="flex flex-col items-center gap-lg">
          <div className="flex items-center gap-sm pl-md">
            <Checkbox
              checked={keyVisible}
              onChange={() => setKeyVisible(!keyVisible)}
            />
            <span className="font-clean text-md text-color-primary">
              Show key
            </span>
          </div>
          <span
            data-visible={!!keyVisible}
            className="
              text-lg text-color-primary
              data-[visible=true]:font-plaintext
              data-[visible=false]:font-ciphertext
            "
          >
            {keyVisible ? encryption.personalKey : "cant-get-it-like-that"}
          </span>
        </div>
        <Button text="Close" onClick={() => setOpen(false)} />
      </div>
    </Dialog>
  );
}
