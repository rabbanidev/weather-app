import React, { createContext, useState } from "react";
import {
  PRECIPITATION_UNIT,
  PRESSURE_UNIT,
  TEMPERATURE_UNIT,
  WIND_SPEED_UNIT,
} from "../types";

type DefaultTheme = {
  tempatureUnit: TEMPERATURE_UNIT;
  updateTempatureUnit: (value: TEMPERATURE_UNIT) => void;

  windSpeed: WIND_SPEED_UNIT;
  updateWindSpeedUpdate: (value: WIND_SPEED_UNIT) => void;

  precipitationUnit: PRECIPITATION_UNIT;
  updatePrecipitationUnit: (value: PRECIPITATION_UNIT) => void;

  pressureUnit: PRESSURE_UNIT;
  updatePressureUnit: (value: PRESSURE_UNIT) => void;
};

export const SettingContext = createContext<DefaultTheme>({
  tempatureUnit: "celsius",
  updateTempatureUnit: () => {},

  windSpeed: "mph",
  updateWindSpeedUpdate: () => {},

  precipitationUnit: "mm",
  updatePrecipitationUnit: () => {},

  pressureUnit: "mmHg",
  updatePressureUnit: () => {},
});

export const SettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tempatureUnit, setTempatureUnit] =
    useState<TEMPERATURE_UNIT>("celsius");
  const [windSpeed, setWindSpeed] = useState<WIND_SPEED_UNIT>("mph");
  const [precipitationUnit, setPrecipitationUnit] =
    useState<PRECIPITATION_UNIT>("mm");
  const [pressureUnit, setPressureUnit] = useState<PRESSURE_UNIT>("mmHg");

  const updateTempatureUnit = (value: TEMPERATURE_UNIT) => {
    setTempatureUnit(value);
  };

  const updateWindSpeedUpdate = (value: WIND_SPEED_UNIT) => {
    setWindSpeed(value);
  };

  const updatePrecipitationUnit = (value: PRECIPITATION_UNIT) => {
    setPrecipitationUnit(value);
  };

  const updatePressureUnit = (value: PRESSURE_UNIT) => {
    setPressureUnit(value);
  };

  return (
    <SettingContext.Provider
      value={{
        tempatureUnit,
        windSpeed,
        precipitationUnit,
        pressureUnit,
        updateTempatureUnit,
        updateWindSpeedUpdate,
        updatePrecipitationUnit,
        updatePressureUnit,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};
