import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { MapStyleElement } from "react-native-maps";
import { mapThemes, themes, Ttheme } from "../themes";

export const useCustomThemeColors = (): {
  mapStyle: MapStyleElement[];
  theme: Ttheme;
} => {
  const sheme = useColorScheme();

  const [mapStyle, setMapStyle] = useState(
    sheme === "light" ? mapThemes.lightTheme : mapThemes.darkTheme
  );

  const [theme, setTheme] = useState<Ttheme>(
    sheme === "light" ? themes.lightTheme : themes.darkTheme
  );

  useEffect(() => {
    setTheme(sheme === "light" ? themes.lightTheme : themes.darkTheme);
    setMapStyle(sheme === "light" ? mapThemes.lightTheme : mapThemes.darkTheme);
  }, [sheme]);

  return {
    mapStyle,
    theme,
  };
};
