import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { City } from "../../types";
import AppText from "../shared/AppText";
import { useEffect, useState } from "react";
import { fetchCities } from "../../services/API";
import useTheme from "../../hooks/useTheme";
import Card from "../shared/Card";
import Error from "../shared/Error";

type CitiesProps = {
  searchValue: string;
  onSelectedCity: (city: City) => void;
};

export default function Cities({ searchValue, onSelectedCity }: CitiesProps) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (searchValue.trim()) {
      const startFetch = async () => {
        try {
          setIsLoading(true);
          const response = await fetchCities(searchValue);
          setCities(response.results);
        } catch (error: any) {
          setErrorMessage(error?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };

      startFetch();
    }
  }, [searchValue]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.light} />;
  } else if (!isLoading && errorMessage) {
    return <Error errorMessage={errorMessage} />;
  }

  return (
    cities.length > 0 && (
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
            <Pressable onPress={() => onSelectedCity(item)}>
              <Card
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
              </Card>
            </Pressable>
          )}
        />
      </View>
    )
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
