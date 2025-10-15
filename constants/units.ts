import {
  PRECIPITATION_UNIT,
  PRESSURE_UNIT,
  TEMPERATURE_UNIT,
  WIND_SPEED_UNIT,
} from "../types";

export const tempatureUnits: TEMPERATURE_UNIT[] = ["celsius", "fahrenheit"];
export const windSpeedUnits: WIND_SPEED_UNIT[] = ["kmh", "mph", "ms"];
export const precipitationUnits: PRECIPITATION_UNIT[] = ["mm", "inch"];
export const pressureUnits: PRESSURE_UNIT[] = ["hPa", "mmHg", "inchHg"];
