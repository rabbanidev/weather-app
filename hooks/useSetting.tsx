import { useContext } from "react";
import { SettingContext } from "../context/SettingContext";

export default function useSetting() {
  return useContext(SettingContext);
}
