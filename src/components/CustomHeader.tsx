import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
//@ts-ignore
import BackIcon from "../media/svg/backIcon.svg";
import { Ttheme } from "../themes";

interface ICustomHeader {
  navigation: any;
  options: any;
  backgroundColor?: string;
}

export const CustomHeader = ({
  navigation,
  backgroundColor = undefined,
  ...props
}: ICustomHeader) => {
  const { theme } = useCustomThemeColors();
  const { top } = useSafeAreaInsets();

  const {
    title,
    rightButtonShown = false,
    RightIcon = undefined,
    onPressHandler = () => {},
  } = props.options;

  return (
    <View
      style={[
        styles(theme, top).headerContainer,
        //@ts-ignore
        backgroundColor && {
          backgroundColor: backgroundColor as unknown as ViewStyle,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles(theme).iconContainer}
      >
        <BackIcon style={styles(theme).backIcon} />
      </TouchableOpacity>
      <View style={styles(theme).titleContainer}>
        <Text style={styles(theme).title}>{title ?? ""}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles(theme).iconContainer,
          { opacity: rightButtonShown ? 1 : 0 },
        ]}
        onPress={onPressHandler}
      >
        {RightIcon !== undefined ? <RightIcon /> : <Text>icon</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Ttheme, top = 0) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      backgroundColor: theme.pageColor,
      height: 56 + top,
      paddingTop: top,
    },
    titleContainer: {
      width: "70%",
      justifyContent: "center",
      alignItems: "center",
    },
    backIcon: {
      //@ts-ignore
      stroke: theme.headerIconColor,
      strokeWidth: 2,
    },
    title: {
      fontFamily: "SFProDisplay-Bold",
      fontSize: 20,
      color: theme.defaultTextColor,
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: "15%",
    },
  });
