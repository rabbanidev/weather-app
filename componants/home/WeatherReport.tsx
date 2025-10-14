import { StyleSheet, View } from "react-native";
import { WeatherData } from "../../types";
import ReportCard from "./ReportCard";

type WeatherHeaderProps = {
  weatherData: WeatherData;
};

export default function WeatherReport({ weatherData }: WeatherHeaderProps) {
  const { current, current_units } = weatherData;

  return (
    <View style={styles.container}>
      <View style={[styles.gridContainer]}>
        <ReportCard
          title="Air Quality"
          value={`${current.wind_speed_10m}${current_units.wind_speed_10m}`}
          icon="air"
        />
        <ReportCard
          title="Humidity"
          value={`${current.relative_humidity_2m}${current_units.relative_humidity_2m}`}
          icon="water"
        />
        <ReportCard
          title="Pressure"
          value={`${current.pressure_msl}${current_units.pressure_msl}`}
          icon="gauge"
        />
        <ReportCard
          title="Wind Speed"
          value={`${current.wind_speed_10m}${current_units.wind_speed_10m}`}
          icon="air"
        />
        <ReportCard
          title="Visibility"
          value={`${current.visibility}${current_units.visibility}`}
          icon="air"
        />
        <ReportCard
          title="UV Index"
          value={`${current.uv_index}${current_units.uv_index}`}
          icon="light-up"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: 15,
    rowGap: 15,
  },
});
