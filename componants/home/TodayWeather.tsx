import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import Card from "../shared/Card";
import AppText from "../shared/AppText";
import { WeatherData } from "../../types";
import { getWeatherTitleIcon } from "../../utils/getWeatherTitleIcon";

// const hourlyData = [
//   { time: "19:00", temp: 23, icon: "02d" },
//   { time: "20:00", temp: 22, icon: "03d" },
//   { time: "21:00", temp: 21, icon: "04d" },
//   { time: "22:00", temp: 20, icon: "01n" },
// ];

type WeatherHeaderProps = {
  weatherData: WeatherData;
};

export default function TodayWeather({ weatherData }: WeatherHeaderProps) {
  const { theme } = useTheme();

  const hourlyData = weatherData.hourly.time.map((t, idx) => {
    const { title, icon } = getWeatherTitleIcon(
      weatherData.hourly.weathercode[idx]
    );
    return {
      title,
      icon,
      time: t,
      temp: weatherData.hourly.temperature_2m[idx],
    };
  });

  return (
    <View style={styles.container}>
      <AppText value=" Today's Forecast" type="title" style={styles.title} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.sliderContainer}
      >
        {hourlyData.map((hour, index) => (
          <Card
            key={index}
            style={{
              justifyContent: "center",
              alignItems: "center",
              rowGap: 5,
            }}
          >
            <AppText value={`${hour.time.split("T")[1]}`} type="secondary" />
            <Text style={{ fontSize: 20 }}>{hour.icon}</Text>
            <View style={styles.tempature}>
              <Text style={[styles.tempatureTitle, { color: theme.primary }]}>
                {hour.temp}
              </Text>
              <Text style={[styles.tempatureDegree, { color: theme.light }]}>
                {weatherData.current_units.temperature_2m}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  sliderContainer: {
    marginTop: 15,
    paddingRight: 15,
    columnGap: 15,
  },
  tempature: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tempatureTitle: {
    fontSize: 30,
    fontFamily: "Roboto-Regular",
  },
  tempatureDegree: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: "Roboto-Regular",
  },
});
