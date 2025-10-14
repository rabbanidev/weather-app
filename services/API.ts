import {
  ILocation,
  NominatimData,
  PRECIPITATION_UNIT,
  PRESSURE_UNIT,
  PreviousWeatherData,
  TEMPERATURE_UNIT,
  UNID_SPEED_UNIT,
  WeatherData,
} from "../types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

type FetchParams = {
  location: ILocation;
  temperature_unit?: TEMPERATURE_UNIT;
  wind_speed_unit?: UNID_SPEED_UNIT;
  precipitation_unit?: PRECIPITATION_UNIT;
  pressure_unit?: PRESSURE_UNIT;
};

export const fetchCurrentWeather = async ({
  location,
  temperature_unit = "celsius",
  wind_speed_unit = "kmh",
  precipitation_unit = "mm",
  pressure_unit = "hPa",
}: FetchParams): Promise<[WeatherData, NominatimData]> => {
  return Promise.all([
    fetch(
      `${BASE_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weathercode,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,uv_index,visibility&hourly=temperature_2m,weathercode&timezone=auto&forecast_days=1&temperature_unit=${temperature_unit}&wind_speed_unit=${wind_speed_unit}&precipitation_unit=${precipitation_unit}&pressure_unit=${pressure_unit}`
    ).then((res) => res.json()),

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`,
      {
        headers: {
          "User-Agent": "ReactNativeApp/1.0",
          Accept: "application/json",
          "Accept-Language": "en",
        },
      }
    ).then((res) => res.json()),
  ]);
};

export const fetchPreviousWeather = async ({
  location,
  startDate,
  endDate,
  temperature_unit = "celsius",
  wind_speed_unit = "kmh",
  precipitation_unit = "mm",
  pressure_unit = "hPa",
}: {
  startDate: string;
  endDate: string;
} & FetchParams): Promise<PreviousWeatherData> => {
  const res = await fetch(
    `${BASE_URL}?latitude=${location.latitude}&longitude=${location.longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,wind_speed_10m_max&timezone=auto&temperature_unit=${temperature_unit}&wind_speed_unit=${wind_speed_unit}&precipitation_unit=${precipitation_unit}&pressure_unit=${pressure_unit}`
  );

  return res.json();
};
