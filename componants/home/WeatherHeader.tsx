import { Image, StyleSheet, Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import Card from "../shared/Card";
import AppText from "../shared/AppText";
import { NominatimData, WeatherData } from "../../types";
import { getDayName } from "../../utils/getDay";
import { getWeatherTitleIcon } from "../../utils/getWeatherTitleIcon";

type WeatherHeaderProps = {
  weatherData: WeatherData;
  nominatimData: NominatimData;
};

export default function WeatherHeader({
  weatherData,
  nominatimData,
}: WeatherHeaderProps) {
  const { theme } = useTheme();
  const { icon } = getWeatherTitleIcon(weatherData.current.weathercode);

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.tempature}>
            <Text
              style={[
                styles.tempatureTitle,
                {
                  color: theme.primary,
                },
              ]}
            >
              {weatherData?.current?.temperature_2m}
            </Text>
            <Text
              style={[
                styles.tempatureDegree,
                {
                  color: theme.light,
                },
              ]}
            >
              {weatherData?.current_units?.temperature_2m}
            </Text>
          </View>
          <AppText value={`${getDayName(new Date())}day`} type="secondary" />
          <AppText
            value={`${nominatimData.address?.county}, ${nominatimData.address.country}`}
            type="secondary"
            style={styles.locationText}
          />
        </View>

        <View>
          <Text style={{ fontSize: 100 }}>{icon}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    width: "50%",
  },
  tempature: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tempatureTitle: {
    fontSize: 64,
    lineHeight: 70,
    fontFamily: "Roboto-Bold",
  },
  tempatureDegree: {
    fontSize: 24,
    marginTop: 4,
    fontFamily: "Roboto-Regular",
  },
  locationText: {
    marginTop: 30,
  },
});
