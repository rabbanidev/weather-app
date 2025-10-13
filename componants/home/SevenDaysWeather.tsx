import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import Card from "../shared/Card";
import AppText from "../shared/AppText";

const hourlyData = [
  { day: "Today", temp: 23, icon: "02d", title: "Sunny" },
  { day: "Today", temp: 23, icon: "02d", title: "Sunny" },
  { day: "Today", temp: 23, icon: "02d", title: "Sunny" },
  { day: "Today", temp: 23, icon: "02d", title: "Sunny" },
  { day: "Today", temp: 23, icon: "02d", title: "Sunny" },
  { day: "Today", temp: 23, icon: "02d", title: "Sunny" },
  { day: "Today", temp: 23, icon: "02d", title: "Sunny" },
];

export default function SevenDaysWeather() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText value="7-Day Forecast" type="title" style={styles.title} />
      <Card style={{ marginTop: 15 }}>
        <FlatList
          data={hourlyData}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <AppText value="Today" type="secondary" />
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/02d.png`,
                }}
                style={{ width: 40, height: 40 }}
              />
              <AppText
                value="Sunny"
                type="secondary"
                style={{
                  fontFamily: "Roboto-Medium",
                  color: theme.light,
                }}
              />
              <AppText value="23°" type="secondary" />
            </View>
          )}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  listContainer: {
    rowGap: 15,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
