import { Ionicons } from "@expo/vector-icons";

export const getIconName = (
  name: string,
  focused: boolean
): keyof typeof Ionicons.glyphMap => {
  switch (name) {
    case "index":
      return focused ? "home" : "home-outline";
    case "Setting":
      return focused ? "settings" : "settings-outline";
    case "Cities":
      return focused ? "list" : "list-outline";
    default:
      return focused ? "home" : "home-outline";
  }
};
