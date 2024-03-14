import React, { Dispatch, SetStateAction } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";

interface ICustomSwitcherComponent {
  label: string;
  onChange: Dispatch<SetStateAction<boolean>>;
  value: boolean;
}

export const CustomSwitcherComponent = ({
  label,
  onChange,
  value,
}: ICustomSwitcherComponent) => {
  const { theme } = useCustomThemeColors();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).textStyle}>{label}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 16,
    },
    textStyle: {
      fontFamily: "SFProDisplay-Medium",
      color: theme.defaultTextColor,
      fontSize: 17,
    },
  });
