"use client";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main aria-label="Main content">{children}</main>;
}
