import { Pressable, StyleSheet, Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";

type SwitchProps = {
  options: string[];
  selectedValue: string;
  onPress: (option: string) => void;
};

export default function Switch({
  options,
  selectedValue,
  onPress,
}: SwitchProps) {
  const { theme } = useTheme();

  const buttonWidth = 100 / options.length;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {options.map((option) => {
        const isActive = option === selectedValue;
        return (
          <Pressable
            key={option}
            style={[
              styles.button,
              {
                backgroundColor: isActive ? theme.card : "transparent",
                width: `${buttonWidth}%`,
              },
            ]}
            onPress={() => onPress(option)}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: theme.secondary,
                },
              ]}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
});
