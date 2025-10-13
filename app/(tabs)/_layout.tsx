import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import useTheme from "../../hooks/useTheme";
import { getIconName } from "../../utils/getIconName";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
        headerTintColor: theme.primary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.light,
        tabBarInactiveTintColor: theme.secondary,

        tabBarIcon: (props) => (
          <Ionicons name={getIconName(route.name, props.focused)} {...props} />
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      <Tabs.Screen name="setting" />
    </Tabs>
  );
}
