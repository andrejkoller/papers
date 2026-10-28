"use client";

import * as React from "react";
import { ThemeContext } from "./theme-context";
import type { Theme } from "./types";

const getServerSnapshot = (): Theme => "dark";

const getSnapshot = (): Theme => {
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    mediaQuery.removeEventListener("change", callback);
  };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const switchTheme = React.useCallback(() => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new StorageEvent("storage"));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};
