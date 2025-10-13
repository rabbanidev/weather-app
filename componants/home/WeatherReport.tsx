import { StyleSheet, Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import Card from "../shared/Card";
import { Entypo } from "@expo/vector-icons";
import AppText from "../shared/AppText";

export default function WeatherReport() {
  const { theme } = useTheme();

  const reportData = [
    { title: "Air Quality", value: 156, icon: "air" },
    { title: "Humidity", value: 82, icon: "water" },
    { title: "Wind Speed", value: 12, icon: "air" },
    { title: "UV Index", value: 5, icon: "light-up" },
    { title: "Pressure", value: "1013 hPa", icon: "gauge" },
    { title: "Visibility", value: "10 km", icon: "eye" },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.gridContainer]}>
        {reportData.map((item, index) => (
          <Card key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Entypo
                name={item.icon as keyof typeof Entypo.glyphMap}
                size={16}
                color={theme.secondary}
              />
              <AppText value={item.title} type="secondary" />
            </View>
            <AppText value={item.value} type="primary" />
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: 15,
    rowGap: 15,
  },
  card: {
    flexBasis: "48%",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
