import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Papers - Andrej Koller",
  description:
    "A collection of theological papers and resources by Andrej Koller.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
