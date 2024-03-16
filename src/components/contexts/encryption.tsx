"use client";

import { ProvideEncryption, EncryptionContext } from "@/lib/encryption";

export default function WithEncryption({
  children,
}: {
  children: React.ReactNode;
}) {
  const encryption = ProvideEncryption();

  return (
    <EncryptionContext.Provider value={encryption}>
      {children}
    </EncryptionContext.Provider>
  );
}
