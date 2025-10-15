import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

type SearchbarProps = {
  defaultValue?: string;
  onSearch: (value: string) => void;
};

export default function Searchbar({ onSearch, defaultValue }: SearchbarProps) {
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (defaultValue?.trim) {
      setSearchValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(searchValue.trim());
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      <View style={styles.searchIconWrapper}>
        <Ionicons name="search" color={theme.secondary} size={16} />
      </View>
      <TextInput
        style={[
          styles.input,
          {
            color: theme.secondary,
          },
        ]}
        placeholder="Search on state/city/state"
        placeholderTextColor={theme.placeHolder}
        value={searchValue}
        onChangeText={setSearchValue}
      />
      {searchValue.trim() && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? theme.background : "transparent",
            },
          ]}
          onPress={() => setSearchValue("")}
        >
          <Ionicons name="close" color={theme.secondary} size={16} />
        </Pressable>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 5,
  },
  searchIconWrapper: {
    position: "absolute",
    top: 18,
    left: 10,
  },
  input: {
    paddingVertical: 15,
    paddingLeft: 40,
    fontSize: 16,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 4,
    top: 6,
    backgroundColor: "transparent",
  },
});
