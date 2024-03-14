import { Platform } from "react-native";

interface IshadowBoxGenerator {
  shadowColorIos?: string;
  xOffset?: number;
  yOffset?: number;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
  shadowColorAndroid?: string;
}

export const shadowBoxGenerator = ({
  shadowColorIos,
  xOffset = -2,
  yOffset = 4,
  shadowOpacity = 0.2,
  shadowRadius = 3,
  elevation = 4,
  shadowColorAndroid,
}: IshadowBoxGenerator): IshadowBoxGenerator => ({
  ...(Platform.OS === "ios"
    ? {
        shadowColor: shadowColorIos,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      }
    : { elevation, shadowColor: shadowColorAndroid }),
});
