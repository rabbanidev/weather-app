import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../shared/Card";
import AppText from "../shared/AppText";
import useTheme from "../../hooks/useTheme";
import { City } from "../../types";

type SelectedCityProps = {
  city?: City | null;
};

export default function SelectedCity({ city }: SelectedCityProps) {
  const { theme } = useTheme();

  if (!city) return;

  return (
    <View style={styles.container}>
      <AppText value="Current City" type="title" />
      <Card
        style={[
          styles.city,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <AppText
          value={`${city.name} (${city.country})`}
          type="secondary"
          style={{
            fontSize: 14,
          }}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 15,
  },
  city: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
