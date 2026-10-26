"use client";

import { Header } from "@/components/header";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main aria-label="Main content">{children}</main>
    </>
  );
}
