import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import Card from "../shared/Card";
import AppText from "../shared/AppText";
import { ILocation, PreviousWeatherData } from "../../types";
import { useEffect, useState } from "react";
import { fetchPreviousWeather } from "../../services/API";
import Error from "../shared/Error";
import { getDayName } from "../../utils/getDay";
import { getWeatherTitleIcon } from "../../utils/getWeatherTitleIcon";
import useSetting from "../../hooks/useSetting";

type SevenDaysWeatherProps = {
  location: ILocation;
};

const today = new Date();

const start = new Date();
start.setDate(today.getDate() - 7);
const startDate = start.toISOString().split("T")[0];

const end = new Date();
end.setDate(today.getDate() - 1);
const endDate = end.toISOString().split("T")[0];

export default function SevenDaysWeather({ location }: SevenDaysWeatherProps) {
  const { theme } = useTheme();
  const { tempatureUnit, pressureUnit, precipitationUnit, windSpeed } =
    useSetting();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [result, setResult] = useState<PreviousWeatherData | null>(null);

  useEffect(() => {
    if (location) {
      const fetchResult = async () => {
        try {
          setErrorMessage("");
          setIsLoading(true);
          const res = await fetchPreviousWeather({
            location,
            startDate,
            endDate,
            wind_speed_unit: windSpeed,
            temperature_unit: tempatureUnit,
            pressure_unit: pressureUnit,
            precipitation_unit: precipitationUnit,
          });
          setResult(res);
        } catch (error: any) {
          setErrorMessage(error?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };
      fetchResult();
    }
  }, [
    location,
    startDate,
    endDate,
    tempatureUnit,
    pressureUnit,
    windSpeed,
    precipitationUnit,
  ]);

  if (isLoading) {
    return <ActivityIndicator size="small" color={theme.light} />;
  } else if (!isLoading && errorMessage) {
    return <Error errorMessage={errorMessage} />;
  }

  const dailyWeatherData = result?.daily.time.map((t, idx) => {
    const date = new Date(result.daily.time[idx]);
    const { title, icon } = getWeatherTitleIcon(result.daily.weathercode[idx]);
    const maxTemp = result.daily.temperature_2m_max[idx];
    const minTemp = result.daily.temperature_2m_min[idx];

    return {
      title,
      icon,
      maxTemp,
      minTemp,
      day: getDayName(date),
    };
  });

  return (
    <View style={styles.container}>
      <AppText value="7-Day Forecast" type="title" style={styles.title} />
      <Card style={{ marginTop: 15, paddingHorizontal: 10 }}>
        <FlatList
          data={dailyWeatherData}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.leftSection}>
                <AppText
                  value={item.day}
                  type="secondary"
                  style={{ fontFamily: "Roboto-Medium" }}
                />
              </View>

              <View style={styles.centerSection}>
                <Text style={styles.icon}>{item.icon}</Text>
                <AppText
                  value={item.title}
                  type="secondary"
                  style={styles.weatherTitle}
                />
              </View>

              <View style={styles.rightSection}>
                <AppText
                  value={`${item.maxTemp}°`}
                  type="secondary"
                  style={styles.maxTemp}
                />
                <AppText
                  value={`/ ${item.minTemp}°`}
                  type="secondary"
                  style={styles.minTemp}
                />
              </View>
            </View>
          )}
        />
      </Card>
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
  listContainer: {
    rowGap: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    width: "20%",
  },

  centerSection: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rightSection: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
  },

  icon: {
    fontSize: 20,
  },

  weatherTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    textTransform: "capitalize",
  },

  maxTemp: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },

  minTemp: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
