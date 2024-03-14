import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";

export enum ButtonTypes {
  primary = "primary",
  secondary = "secondary",
  warning = "warning",
}

interface ICustomButton {
  Icon?: any;
  onPressHandler: () => void;
  buttonText: any;
  type: ButtonTypes;
  containerStyles: Record<string, any>;
}

export const CustomButton = ({
  Icon = undefined,
  onPressHandler = () => {},
  buttonText = "",
  type = ButtonTypes.primary,
  containerStyles = { width: "100%" },
}: ICustomButton) => {
  const { theme } = useCustomThemeColors();
  const buttonTypes = {
    primary: {
      text: styles(theme).textPrimary,
      block: styles(theme).primary,
    },
    secondary: {
      text: styles(theme).textSecondary,
      block: styles(theme).secondary,
    },
    warning: {
      text: styles(theme).textWarning,
      block: styles(theme).warning,
    },
  };
  const [stylesBtn, setStylesBtn] = useState(type);
  return (
    <TouchableOpacity
      style={[buttonTypes[type].block, containerStyles]}
      onPress={onPressHandler}
    >
      {type === "primary"
        ? Icon && (
            <View style={styles(theme).iconFillPrimary}>
              {Icon && <Icon />}
            </View>
          )
        : Icon && <Icon fill={theme.iconFillMoreInfo} />}
      <Text
        style={[
          buttonTypes[type].text,
          containerStyles.width === "100%" && { fontSize: 17 },
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    primary: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.blueButton,
      borderRadius: 24,
      padding: 12,
    },
    iconFillPrimary: {
      height: 16,
      width: 16,
      backgroundColor: theme.iconCircleTakeRoute,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    textPrimary: {
      fontFamily: "SFProDisplay-Bold",
      color: theme.textButtonRoute,
      fontSize: 15,
      fontWeight: "600",
      marginLeft: 6,
    },
    secondary: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.grayButton,
      borderRadius: 24,
      padding: 12,
    },
    textSecondary: {
      fontFamily: "SFProDisplay-Bold",
      color: theme.textButtonInfo,
      fontSize: 15,
      fontWeight: "600",
      marginLeft: 6,
    },
    textWarning: {
      fontFamily: "SFProDisplay-Bold",
      color: theme.warningText,
      fontSize: 15,
      fontWeight: "600",
      marginLeft: 6,
    },
    warning: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.warningLight,
      borderRadius: 24,
      padding: 12,
    },
  });
