import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import Searchbar from "../../componants/shared/Searchbar";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentWeather } from "../../services/API";
import { City, NominatimData, WeatherData } from "../../types";
import Cities from "../../componants/cities/Cities";
import SelectedCity from "../../componants/cities/SelectedCity";
import useSetting from "../../hooks/useSetting";
import WeatherHeader from "../../componants/home/WeatherHeader";
import WeatherReport from "../../componants/home/WeatherReport";
import Error from "../../componants/shared/Error";

export default function CitiesScreen() {
  const { theme } = useTheme();
  const { tempatureUnit, pressureUnit, precipitationUnit, windSpeed } =
    useSetting();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [weatherResult, setWeatherResult] = useState<WeatherData | null>(null);
  const [nominatimResult, setNominatimResult] = useState<NominatimData | null>(
    null
  );

  const onSelectedCity = (city: City) => {
    setCurrentCity({ ...currentCity, ...city });
    setSearchValue("");
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentCity(null);
    setWeatherResult(null);
    setNominatimResult(null);
    setErrorMessage("");
    setIsLoading(false);
    setSearchValue("");

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (currentCity) {
      const fetchResult = async () => {
        try {
          setErrorMessage("");
          setIsLoading(true);

          const res = await fetchCurrentWeather({
            location: {
              latitude: currentCity.latitude,
              longitude: currentCity.longitude,
            },
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
      };
      fetchResult();
    }
  }, [currentCity, tempatureUnit, pressureUnit, windSpeed, precipitationUnit]);

  let content;
  if (isLoading) {
    content = <ActivityIndicator size="large" color={theme.light} />;
  } else if (!isLoading && errorMessage) {
    content = <Error errorMessage={errorMessage} />;
  } else if (!isLoading && !errorMessage && currentCity) {
    content = (
      <>
        <SelectedCity city={currentCity} />
        {weatherResult && nominatimResult && (
          <>
            <WeatherHeader
              weatherData={weatherResult}
              nominatimData={nominatimResult}
            />
            <WeatherReport weatherData={weatherResult} />
          </>
        )}
      </>
    );
  }

  return (
    <ScrollView
      style={[
        styles.scrollContainer,
        {
          backgroundColor: theme.background,
        },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Searchbar defaultValue={searchValue} onSearch={setSearchValue} />
        <Cities searchValue={searchValue} onSelectedCity={onSelectedCity} />

        {content}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    rowGap: 30,
  },
});
