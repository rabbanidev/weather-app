import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherHeader from "../../componants/home/WeatherHeader";
import TodayWeather from "../../componants/home/TodayWeather";
import WeatherReport from "../../componants/home/WeatherReport";
import SevenDaysWeather from "../../componants/home/SevenDaysWeather";
import Error from "../../componants/shared/Error";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentWeather } from "../../services/API";
import { ILocation, NominatimData, WeatherData } from "../../types";

export default function HomeScreen() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    isLoading: currentLocationIsLoading,
    errorMessage: currentLocationErrorMessage,
    location: currentLocation,
  } = useCurrentLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [weatherResult, setWeatherResult] = useState<WeatherData | null>(null);
  const [nominatimResult, setNominatimResult] = useState<NominatimData | null>(
    null
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const fetchResult = async () => {
        try {
          setErrorMessage("");
          setIsLoading(true);

          const res = await fetchCurrentWeather({
            location: currentLocation,
          });

          setWeatherResult(res[0]);
          setNominatimResult(res[1]);
        } catch (error: any) {
          setErrorMessage(error?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };
      fetchResult();
    }
  }, [currentLocation]);

  if (currentLocationIsLoading || isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.light} />
      </SafeAreaView>
    );
  } else if (currentLocationErrorMessage || errorMessage) {
    return <Error errorMessage={currentLocationErrorMessage} />;
  }

  return (
    weatherResult &&
    nominatimResult && (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <WeatherHeader
            weatherData={weatherResult}
            nominatimData={nominatimResult}
          />
          <WeatherReport weatherData={weatherResult} />
          <TodayWeather weatherData={weatherResult} />
          <SevenDaysWeather location={currentLocation as ILocation} />
        </ScrollView>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
