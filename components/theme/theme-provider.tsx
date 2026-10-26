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

  const switchTheme = React.useCallback(
    (event?: React.MouseEvent) => {
      const newTheme: Theme = theme === "light" ? "dark" : "light";

      if (event) {
        document.documentElement.style.setProperty(
          "--theme-x",
          `${event.clientX}px`,
        );
        document.documentElement.style.setProperty(
          "--theme-y",
          `${event.clientY}px`,
        );
      } else {
        const toggle = document.querySelector<HTMLElement>(
          "[data-theme-toggle]",
        );
        if (toggle) {
          const rect = toggle.getBoundingClientRect();
          document.documentElement.style.setProperty(
            "--theme-x",
            `${rect.left + rect.width / 2}px`,
          );
          document.documentElement.style.setProperty(
            "--theme-y",
            `${rect.top + rect.height / 2}px`,
          );
        }
      }

      const apply = () => {
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme);
        window.dispatchEvent(new StorageEvent("storage"));
      };

      if (
        typeof document !== "undefined" &&
        "startViewTransition" in document
      ) {
        document.startViewTransition(apply);
      } else {
        apply();
      }
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};
