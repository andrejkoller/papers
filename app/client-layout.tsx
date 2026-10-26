"use client";

import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme/theme-provider";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <Header />
      <main aria-label="Main content">{children}</main>
    </ThemeProvider>
  );
}
