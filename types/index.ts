import { Colors } from "../constants/theme";

export type ThemeType = keyof typeof Colors;

export type ILocation = {
  latitude: number;
  longitude: number;
};

export type TEMPERATURE_UNIT = "celsius" | "fahrenheit";
export type WIND_SPEED_UNIT = "kmh" | "ms" | "mph" | "kn";
export type PRECIPITATION_UNIT = "mm" | "inch";
export type PRESSURE_UNIT = "hPa" | "mmHg" | "inchHg";

export type WeatherData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentData;
  hourly_units: HourlyUnits;
  hourly: HourlyData;
};

export type CurrentUnits = {
  time: string;
  interval: string;
  temperature_2m: string;
  weathercode: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  pressure_msl: string;
  wind_speed_10m: string;
  uv_index: string;
  visibility: string;
};

export type CurrentData = {
  time: string;
  interval: number;
  temperature_2m: number;
  weathercode: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  pressure_msl: number;
  wind_speed_10m: number;
  uv_index: number;
  visibility: number;
};

export type HourlyUnits = {
  time: string;
  temperature_2m: string;
};

export type HourlyData = {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
};

export type NominatimData = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: NominatimAddress;
  boundingbox: [string, string, string, string];
};

export type NominatimAddress = {
  house_number?: string;
  road?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country: string;
  country_code: string;
};

export type PreviousWeatherData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyData;
};

export type DailyUnits = {
  precipitation_sum: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weathercode: string;
  wind_speed_10m_max: string;
};

export type DailyData = {
  precipitation_sum: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weathercode: number[];
  wind_speed_10m_max: number[];
};
