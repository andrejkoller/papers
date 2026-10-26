"use client";

import * as React from "react";
import { ThemeContext } from "./theme-context";

export const useTheme = () => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
