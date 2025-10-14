import { View, Text, StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";
import TempSwitch from "../../componants/shared/Switch";

export default function SettingScreen() {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <TempSwitch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
