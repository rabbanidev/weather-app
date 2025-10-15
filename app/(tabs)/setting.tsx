import { View, StyleSheet, ScrollView } from "react-native";
import useTheme from "../../hooks/useTheme";
import Units from "../../componants/settings/Units";
import General from "../../componants/settings/General";

export default function SettingScreen() {
  const { theme } = useTheme();
  return (
    <ScrollView
      style={[
        styles.scrollContainer,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.container}>
        <Units />
        <General />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    rowGap: 40,
  },
});
