import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../hooks/useTheme";

export default function Error({ errorMessage }: { errorMessage: string }) {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Text style={styles.errorText}>{errorMessage}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ec185fff",
    fontSize: 20,
  },
});
