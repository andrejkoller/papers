"use client";

import * as React from "react";
import type { ThemeContextType } from "./types";

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);
