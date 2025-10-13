import { Image, StyleSheet, Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import Card from "../shared/Card";
import AppText from "../shared/AppText";

export default function WeatherHeader() {
  const { theme } = useTheme();

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.tempature}>
            <Text
              style={[
                styles.tempatureTitle,
                {
                  color: theme.primary,
                },
              ]}
            >
              23
            </Text>
            <Text
              style={[
                styles.tempatureDegree,
                {
                  color: theme.light,
                },
              ]}
            >
              °C
            </Text>
          </View>
          <AppText value="Friday" type="secondary" />
          <AppText
            value="Dhaka, BD"
            type="secondary"
            style={styles.locationText}
          />
        </View>

        <View>
          <Image
            source={{
              uri: "https://openweathermap.org/img/wn/02d@2x.png",
            }}
            width={150}
            height={150}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    width: "50%",
  },
  tempature: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tempatureTitle: {
    fontSize: 64,
    lineHeight: 70,
    fontFamily: "Roboto-Bold",
  },
  tempatureDegree: {
    fontSize: 24,
    marginTop: 4,
    fontFamily: "Roboto-Regular",
  },
  locationText: {
    marginTop: 30,
  },
});
