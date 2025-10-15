import { StyleSheet, View } from "react-native";
import AppText from "../shared/AppText";
import Card from "../shared/Card";
import useTheme from "../../hooks/useTheme";
import Switch from "../shared/Switch";
import { themeModes } from "../../constants/theme";

export default function General() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText
        value="General"
        type="title"
        style={[
          styles.title,
          {
            color: theme.primary,
          },
        ]}
      />
      <Card style={styles.card}>
        {/* Theme */}
        <View style={styles.cardContent}>
          <AppText
            value="Theme"
            type="secondary"
            style={styles.cardContentTitle}
          />
          <Switch
            options={themeModes}
            selectedValue={mode}
            onPress={toggleTheme}
          />
        </View>
        {/* AM/PM */}
        {/* <View style={styles.cardContent}>
          <AppText
            value="Theme"
            type="secondary"
            style={styles.cardContentTitle}
          />
          <Switch
            options={["AM", "PM"]}
            selectedValue={"AM"}
            onPress={(option) => {
              console.log(option);
            }}
          />
        </View> */}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
  },
  title: {
    textTransform: "uppercase",
  },
  card: {
    paddingHorizontal: 10,
    rowGap: 10,
  },
  cardContent: {
    rowGap: 10,
  },
  cardContentTitle: {
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
    textTransform: "capitalize",
  },
});
