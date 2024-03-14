import React, { FC, ReactNode, useCallback } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { shadowBoxGenerator } from "../utils/shadowBoxGenerator";
import { Ttheme } from "../themes";
import { useDispatch } from "react-redux";
import { changePage } from "../store/core/coreActions";
import { usePageIndex } from "../store/core/coreSelectors";
import { i18n } from "../i18n/i18n";
// @ts-ignore
import MapIcon from "../media/svg/map.svg";
// @ts-ignore
import DiceIcon from "../media/svg/map.svg";
// @ts-ignore
import FeedIcon from "../media/svg/feed.svg";

interface IMenuButton {
  theme: Ttheme;
  index: number;
  text: string;
  SvgItem: any;
}

export const MenuButtons = () => {
  const menuButtons: Record<string, any>[] = [
    {
      text: i18n.t("mapMenu"),
      Icon: MapIcon,
    },
    {
      text: i18n.t("imLuckyMenu"),
      Icon: DiceIcon,
    },
    {
      text: i18n.t("feedMenu"),
      Icon: FeedIcon,
    },
  ];
  const dispatch = useDispatch();
  const pageIndex = usePageIndex();

  const { theme } = useCustomThemeColors();
  const onPressHandler = (index: number) => {
    dispatch(changePage(index));
  };

  return (
    <View style={styles(theme).buttonsContainer}>
      {menuButtons.map(({ Icon, text }, index) => (
        <TouchableOpacity
          key={text + index}
          style={[
            styles(theme).menuItem,
            index === pageIndex && styles(theme).activeMenu,
          ]}
          onPress={() => onPressHandler(index)}
        >
          <Icon fill={theme.textColor} />
          <Text style={styles(theme).textStyle}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    buttonsContainer: {
      position: "absolute",
      bottom: 35,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: Dimensions.get("window").width * 0.8,
      height: 52,
      backgroundColor: theme.grey1,
      borderRadius: 34,
      overflow: "hidden",
    },
    menuItem: {
      width: "33%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    textStyle: {
      textAlign: "center",
      marginLeft: 10,
      color: theme.textColor,
    },
    activeMenu: {
      backgroundColor: theme.menuActiveColor,
      height: 44,
      borderRadius: 47,
      ...shadowBoxGenerator({
        shadowColorAndroid: "#000000",
        shadowColorIos: "#000000",
        yOffset: 1,
        xOffset: 2,
      }),
    },
  });
