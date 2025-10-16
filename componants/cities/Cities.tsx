import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { City } from "../../types";
import AppText from "../shared/AppText";
import { useEffect, useState } from "react";
import { fetchCities } from "../../services/API";
import useTheme from "../../hooks/useTheme";
import Error from "../shared/Error";

type CitiesProps = {
  searchValue?: string;
  onSelectedCity: (city: City) => void;
};

export default function Cities({ searchValue, onSelectedCity }: CitiesProps) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (searchValue?.trim()) {
      const startFetch = async () => {
        try {
          setIsLoading(true);
          const response = await fetchCities(searchValue);
          if (response.results && response.results.length > 0) {
            setCities(response.results);
          } else {
            setCities([]);
          }
        } catch (error: any) {
          setErrorMessage(error?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };

      startFetch();
    }
  }, [searchValue]);

  if (!searchValue?.trim()) return;

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.light} />;
  } else if (!isLoading && errorMessage) {
    return <Error errorMessage={errorMessage} />;
  } else if (cities.length === 0) {
    return <Error errorMessage="Search result empty" />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      <AppText value="City List (Select city)" type="title" />
      <FlatList
        contentContainerStyle={styles.cityList}
        data={cities}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSelectedCity(item)}
            style={[
              styles.city,
              {
                backgroundColor: theme.background,
              },
            ]}
          >
            <AppText
              value={`${item.name} (${item.country})`}
              type="secondary"
              style={{
                fontSize: 14,
              }}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 15,
    width: "100%",
    padding: 10,
    borderRadius: 8,
  },
  cityList: {
    rowGap: 10,
  },
  city: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
