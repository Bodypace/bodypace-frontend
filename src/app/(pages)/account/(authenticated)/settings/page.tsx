"use client";

import React from "react";

import Button from "@/components/atoms/button";
import ShowKeyDialog from "@/components/molecules/dialogs/show-key-dialog";
import RemoveKeyDialog from "@/components/molecules/dialogs/remove-key-dialog";
import EnterKeyDialog from "@/components/molecules/dialogs/enter-key-dialog";

import { useAccount } from "@/lib/account";
import { useEncryption } from "@/lib/encryption";

export default function AccountSettingsPage() {
  const [showKeyDialog, setShowKeyDialog] = React.useState(false);
  const [removeKeyDialog, setRemoveKeyDialog] = React.useState(false);
  const [enterKeyDialog, setEnterKeyDialog] = React.useState(false);

  const account = useAccount();
  const encryption = useEncryption();

  return (
    <div className="flex flex-1 flex-col items-center gap-xl py-2xl">
      <header className="flex flex-col items-center gap-lg pb-2xl">
        <h1 className="font-brand text-xl text-color-primary">
          {account.info?.username}
        </h1>
        <h2 className="font-technical text-lg text-color-primary">Settings</h2>
      </header>
      {encryption.personalKey && (
        <>
          <Button
            text="See Personal Key"
            wide
            onClick={() => setShowKeyDialog(true)}
          />
          <Button
            text="Remove Personal Key"
            wide
            onClick={() => setRemoveKeyDialog(true)}
          />
        </>
      )}
      {!encryption.personalKey && (
        <Button
          text="Enter Personal Key"
          wide
          onClick={() => setEnterKeyDialog(true)}
        />
      )}
      <Button text="Logout" wide onClick={() => account.logout()} />
      <Button text="Close Settings" wide onClick="/account" />
      <ShowKeyDialog open={showKeyDialog} setOpen={setShowKeyDialog} />
      <RemoveKeyDialog open={removeKeyDialog} setOpen={setRemoveKeyDialog} />
      <EnterKeyDialog open={enterKeyDialog} setOpen={setEnterKeyDialog} />
    </div>
  );
}
