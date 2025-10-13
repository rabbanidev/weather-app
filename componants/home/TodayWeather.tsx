import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import Card from "../shared/Card";
import AppText from "../shared/AppText";

const hourlyData = [
  { time: "19:00", temp: 23, icon: "02d" },
  { time: "20:00", temp: 22, icon: "03d" },
  { time: "21:00", temp: 21, icon: "04d" },
  { time: "22:00", temp: 20, icon: "01n" },
];

export default function TodayWeather() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText value=" Today's Forecast" type="title" style={styles.title} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.sliderContainer}
      >
        {hourlyData.map((hour, index) => (
          <Card key={index}>
            <AppText value={hour.time} type="secondary" />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${hour.icon}.png`,
              }}
              style={{ width: 50, height: 50 }}
            />
            <View style={styles.tempature}>
              <Text style={[styles.tempatureTitle, { color: theme.primary }]}>
                {hour.temp}
              </Text>
              <Text style={[styles.tempatureDegree, { color: theme.light }]}>
                °C
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
