import { Ionicons } from "@expo/vector-icons";

export const getIconName = (
  name: string,
  focused: boolean
): keyof typeof Ionicons.glyphMap => {
  switch (name) {
    case "index":
      return focused ? "home" : "home-outline";

    case "setting":
      return focused ? "settings" : "settings-outline";
    default:
      return focused ? "home" : "home-outline";
  }
};
