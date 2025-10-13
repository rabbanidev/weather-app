import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import useTheme from "../../hooks/useTheme";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: CardProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          position: "relative",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "auto",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    position: "relative",
  },
});
