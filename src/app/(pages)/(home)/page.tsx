"use client";

import Logo from "@/components/atoms/logo";
import Button from "@/components/atoms/button";

export default function HomePage() {
  return (
    <>
      <header className="flex flex-col items-center gap-md py-2xl">
        <Logo />
        <h1 className="font-light text-2xl text-color-primary">
          Own your health data, share it, and get insights from it
        </h1>
      </header>
      <div className="flex flex-row gap-md">
        <Button text="Login/Register" onClick="account" />
        <Button text="Receive Share" onClick="receive-share" />
        <Button text="Download App" onClick="downloads" />
      </div>
      <div className="flex-1" />
    </>
  );
}
