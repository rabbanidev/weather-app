import { ScrollView, StyleSheet, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherHeader from "../../componants/home/WeatherHeader";
import TodayWeather from "../../componants/home/TodayWeather";
import WeatherReport from "../../componants/home/WeatherReport";
import SevenDaysWeather from "../../componants/home/SevenDaysWeather";

export default function HomeScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView>
        <WeatherHeader />
        <WeatherReport />
        <TodayWeather />
        <SevenDaysWeather />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
