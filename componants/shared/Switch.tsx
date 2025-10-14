import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface TempSwitchProps {
  onChange: (unit: "C" | "F") => void;
  initialUnit?: "C" | "F";
}

const TempSwitch: React.FC<TempSwitchProps> = ({
  onChange,
  initialUnit = "C",
}) => {
  const [unit, setUnit] = useState<"C" | "F">(initialUnit);

  const handlePress = (selectedUnit: "C" | "F") => {
    setUnit(selectedUnit);
    onChange(selectedUnit);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.option,
          unit === "C" ? styles.activeOption : {},
          { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
        ]}
        onPress={() => handlePress("C")}
      >
        <Text style={[styles.text, unit === "C" ? styles.activeText : {}]}>
          °C
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          unit === "F" ? styles.activeOption : {},
          { borderTopRightRadius: 20, borderBottomRightRadius: 20 },
        ]}
        onPress={() => handlePress("F")}
      >
        <Text style={[styles.text, unit === "F" ? styles.activeText : {}]}>
          °F
        </Text>
      </Pressable>
    </View>
  );
};

export default TempSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    overflow: "hidden",
    width: 120,
    height: 40,
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  activeOption: {
    backgroundColor: "#4a90e2",
  },
  text: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
});
