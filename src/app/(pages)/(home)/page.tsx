"use client";

import Logo from "@/components/atoms/logo";
import Button from "@/components/atoms/button";
import Navigation from "@/components/molecules/navigation";
import Footer from "@/components/molecules/footer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      <header className="flex flex-col items-center gap-md py-2xl">
        <Logo />
        <h1 className="font-light text-2xl text-color-primary">
          Own your health data, share it, and get insights from it
        </h1>
      </header>
      <div className="flex flex-row gap-md">
        <Button
          text="Login/Register"
          className="w-[280px]"
          border
          center
          target="account"
        />
        <Button
          text="Receive Share"
          className="w-[280px]"
          border
          center
          target="receive-share"
        />
        <Button
          text="Download App"
          className="w-[280px]"
          border
          center
          target="downloads"
        />
      </div>
      <div className="flex-1" />
      <Footer />
    </main>
  );
}
