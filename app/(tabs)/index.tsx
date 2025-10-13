import { View, Text, StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function HomeScreen() {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
