import { StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Card from "../shared/Card";
import AppText from "../shared/AppText";
import useTheme from "../../hooks/useTheme";

type ReportCardProps = {
  icon: keyof typeof Entypo.glyphMap;
  title: string;
  value: string | number;
};

export default function ReportCard({ icon, title, value }: ReportCardProps) {
  const { theme } = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <Entypo name={icon} size={16} color={theme.secondary} />
        <AppText value={title} type="secondary" />
      </View>
      <AppText value={value} type="primary" />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "48%",
    width: "auto",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
