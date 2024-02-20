"use client";

import Button from "@/components/atoms/button";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center py-2xl gap-2xl">
      <header className="flex flex-col items-center gap-2xl">
        <h1 className="text-center font-brand text-massive text-color-primary w-[1028px]">
          Welcome to privacy respecting health data cloud
        </h1>
        <h2 className="text-center font-brand text-lg text-color-primary w-[685px]">
          {
            "We literally can't read your data while you can share it securely with whoever you wish"
          }
        </h2>
      </header>
      <div className="flex flex-row gap-md">
        <Button text="Login/Register" onClick="account" />
      </div>
    </div>
  );
}
