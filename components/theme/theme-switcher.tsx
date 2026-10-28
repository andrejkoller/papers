"use client";

import * as React from "react";
import { useTheme } from "./use-theme";
import { cn } from "@/lib/merge-classes";

export const ThemeSwitcher = () => {
  const { theme, switchTheme, mounted } = useTheme();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "D") {
        e.preventDefault();
        switchTheme();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [switchTheme]);

  if (!mounted) return null;

  return (
    <button
      data-theme-toggle
      onClick={() => switchTheme()}
      className={cn(
        "flex size-8 cursor-pointer items-center justify-center",
        "rounded-lg transition-colors duration-200",
        "hover:bg-(--accent)",
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode (Shift + D)`}
    >
      <DarkSideIcon isDark={theme === "dark"} />
    </button>
  );
};

function DarkSideIcon({
  isDark,
  className,
}: {
  isDark: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={cn(
        "size-4 origin-center",
        "transition-transform duration-500 ease-out",
        isDark ? "rotate-180" : "rotate-0",
        className ?? "",
      )}
    >
      <path d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z" />
    </svg>
  );
}
