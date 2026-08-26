import { useContext } from "react";
import { ThemeContext } from "./theme-provider";

/** Consume the nearest ThemeProvider's theme and toggle function. */
export const useTheme = () => useContext(ThemeContext);
