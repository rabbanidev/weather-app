import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import { ILocation } from "../types";

export default function useCurrentLocation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [location, setLocation] = useState<ILocation | null>(null);

  const loadUserCurrentLocation = useCallback(async () => {
    try {
      setIsLoading(true);

      // Ask for permission
      const res = await Location.requestForegroundPermissionsAsync();
      if (res.status !== "granted") {
        setErrorMessage("Permission to access location was denied");
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLocation({
        ...location,
        latitude: loc.coords?.latitude,
        longitude: loc.coords?.longitude,
      });
    } catch (error: any) {
      setErrorMessage(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserCurrentLocation();
  }, [loadUserCurrentLocation]);

  return {
    isLoading,
    errorMessage,
    location,
  };
}
