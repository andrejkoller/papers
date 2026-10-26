import * as React from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  switchTheme: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  mounted: boolean;
}
