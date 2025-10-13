export const Colors = {
  light: {
    background: "#e8f1fb",
    border: "#e8f1fb",
    card: "#ffffff",
    primary: "#0b131e",
    secondary: "#4a6572",
    light: "#0095ff",
  },
  dark: {
    background: "#0b131e",
    border: "#0b131e",
    card: "#202b3b",
    primary: "#f0f1f1",
    secondary: "#65788d",
    light: "#0095ff",
  },
};

export type ThemeType = keyof typeof Colors;
