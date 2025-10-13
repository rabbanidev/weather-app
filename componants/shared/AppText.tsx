import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import useTheme from "../../hooks/useTheme";

type AppTextProps = {
  value: string | number;
  type?: "primary" | "secondary" | "title";
  style?: StyleProp<TextStyle>;
};

export default function AppText({ value, type, style }: AppTextProps) {
  const { theme } = useTheme();

  let color: string, fontSize: number;
  if (type === "title") {
    color = theme.secondary;
    fontSize = 18;
  } else if (type === "primary") {
    color = theme.primary;
    fontSize = 30;
  } else {
    color = theme.secondary;
    fontSize = 16;
  }

  return (
    <Text
      style={[
        styles.text,
        {
          color,
          fontSize,
        },
        style,
      ]}
    >
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
    letterSpacing: 1,
  },
});
