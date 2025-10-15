import { StyleSheet, View } from "react-native";
import AppText from "../shared/AppText";
import Card from "../shared/Card";
import useTheme from "../../hooks/useTheme";
import Switch from "../shared/Switch";
import {
  precipitationUnits,
  pressureUnits,
  tempatureUnits,
  windSpeedUnits,
} from "../../constants/units";

export default function Units() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText
        value="Units"
        type="title"
        style={[
          styles.title,
          {
            color: theme.primary,
          },
        ]}
      />
      <Card style={styles.card}>
        {/* Tempature unit */}
        <View style={styles.cardContent}>
          <AppText
            value="Temperature"
            type="secondary"
            style={styles.cardContentTitle}
          />
          <Switch
            options={tempatureUnits}
            selectedValue={"celsius"}
            onPress={(option) => {
              console.log(option);
            }}
          />
        </View>
        {/* Wind speed unit */}
        <View style={styles.cardContent}>
          <AppText
            value="Wind Speed"
            type="secondary"
            style={styles.cardContentTitle}
          />
          <Switch
            options={windSpeedUnits}
            selectedValue="mph"
            onPress={(option) => {
              console.log(option);
            }}
          />
        </View>
        {/* Precipitation unit */}
        <View style={styles.cardContent}>
          <AppText
            value="Precipitation Speed"
            type="secondary"
            style={styles.cardContentTitle}
          />
          <Switch
            options={precipitationUnits}
            selectedValue="mm"
            onPress={(option) => {
              console.log(option);
            }}
          />
        </View>
        {/* Pressure unit */}
        <View style={styles.cardContent}>
          <AppText
            value="Pressure Speed"
            type="secondary"
            style={styles.cardContentTitle}
          />
          <Switch
            options={pressureUnits}
            selectedValue="mmHg"
            onPress={(option) => {
              console.log(option);
            }}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
  },
  title: {
    textTransform: "uppercase",
  },
  card: {
    paddingHorizontal: 10,
    rowGap: 10,
  },
  cardContent: {
    rowGap: 10,
  },
  cardContentTitle: {
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
    textTransform: "capitalize",
  },
});
