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
import useSetting from "../../hooks/useSetting";
import {
  PRECIPITATION_UNIT,
  PRESSURE_UNIT,
  TEMPERATURE_UNIT,
  WIND_SPEED_UNIT,
} from "../../types";

export default function Units() {
  const { theme } = useTheme();
  const {
    tempatureUnit,
    pressureUnit,
    precipitationUnit,
    windSpeed,
    updateTempatureUnit,
    updatePrecipitationUnit,
    updatePressureUnit,
    updateWindSpeedUpdate,
  } = useSetting();

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
            selectedValue={tempatureUnit}
            onPress={(option) =>
              updateTempatureUnit(option as TEMPERATURE_UNIT)
            }
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
            selectedValue={windSpeed}
            onPress={(option) =>
              updateWindSpeedUpdate(option as WIND_SPEED_UNIT)
            }
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
            selectedValue={precipitationUnit}
            onPress={(option) =>
              updatePrecipitationUnit(option as PRECIPITATION_UNIT)
            }
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
            selectedValue={pressureUnit}
            onPress={(option) => updatePressureUnit(option as PRESSURE_UNIT)}
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
