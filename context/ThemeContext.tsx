import React, { createContext, useEffect, useState } from "react";
import { Colors } from "../constants/theme";
import { Appearance } from "react-native";
import { ThemeType } from "../types";

type DefaultTheme = {
  theme: typeof Colors.light;
  mode: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<DefaultTheme>({
  theme: Colors.light,
  mode: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeType>("light");

  // Auto-update when system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setMode(colorScheme ?? "light");
    });
    return () => listener.remove();
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  const theme = Colors[mode];

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
