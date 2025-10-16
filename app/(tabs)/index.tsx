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
import useSetting from "../../hooks/useSetting";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { tempatureUnit, pressureUnit, precipitationUnit, windSpeed } =
    useSetting();
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

  const loadWeatherData = useCallback(async () => {
    if (!currentLocation) return;

    try {
      setErrorMessage("");
      setIsLoading(true);

      const res = await fetchCurrentWeather({
        location: currentLocation,
        wind_speed_unit: windSpeed,
        temperature_unit: tempatureUnit,
        pressure_unit: pressureUnit,
        precipitation_unit: precipitationUnit,
      });

      setWeatherResult(res[0]);
      setNominatimResult(res[1]);
    } catch (error: any) {
      setErrorMessage(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    currentLocation,
    windSpeed,
    tempatureUnit,
    pressureUnit,
    precipitationUnit,
  ]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWeatherData();

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, [loadWeatherData]);

  let content;
  if (currentLocationIsLoading || isLoading) {
    content = <ActivityIndicator size="large" color={theme.light} />;
  } else if (!isLoading && (currentLocationErrorMessage || errorMessage)) {
    content = (
      <Error errorMessage={currentLocationErrorMessage || errorMessage} />
    );
  } else if (
    !isLoading &&
    !currentLocationErrorMessage &&
    !errorMessage &&
    !weatherResult &&
    !nominatimResult
  ) {
    content = (
      <Error errorMessage="Weather data not fetched please reload app." />
    );
  } else if (
    !isLoading &&
    !currentLocationErrorMessage &&
    !errorMessage &&
    weatherResult &&
    nominatimResult
  ) {
    content = (
      <>
        <WeatherHeader
          weatherData={weatherResult}
          nominatimData={nominatimResult}
        />
        <WeatherReport weatherData={weatherResult} />
        <TodayWeather weatherData={weatherResult} />
        <SevenDaysWeather location={currentLocation as ILocation} />
      </>
    );
  }

  return (
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
        {content}
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
