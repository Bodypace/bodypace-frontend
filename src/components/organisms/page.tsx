"use client";

import Navigation from "../molecules/navigation";
import Footer from "../molecules/footer";

import { ProvideEncryption, EncryptionContext } from "@/lib/encryption";

export default function Page({ children }: { children: React.ReactNode }) {
  const encryption = ProvideEncryption();

  return (
    <EncryptionContext.Provider value={encryption}>
      <div className="flex flex-col min-h-screen w-full bg-color-background">
        <Navigation />
        <main className="flex flex-1 flex-col items-center">{children}</main>
        <Footer />
      </div>
    </EncryptionContext.Provider>
  );
}
