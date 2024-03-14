import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";
import { MapStackNavigation } from "../types/navigationTypes";

export const ChatsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<MapStackNavigation>();
  const { theme } = useCustomThemeColors();

  useEffect(() => {
    navigation.setOptions({ title: t("messagesTitle") });
  }, []);

  const chatData = [
    {
      sender: "User",
      lastMessage: "testLastMessage",
      id: "teasdqwe123123",
      userPic: undefined,
      date: new Date().getTime(),
    },
    {
      sender: "User1",
      lastMessage: "testLastMessage yoyo nigga lol benis",
      id: "teasdqweasdad123123",
      userPic: undefined,
      date: new Date().getTime(),
    },
  ];

  //   const onTestHandler = useCallback(() => {
  //     socketConnection.emit("message", { test: "test" });
  //   }, []);

  return (
    <View>
      <TouchableOpacity
        // onPress={onTestHandler}
        style={styles(theme).chatBlockContainer}
      >
        <View style={styles(theme).imageContainer}>
          <Image style={styles(theme).image} source={{ uri: undefined }} />
        </View>
        <View style={styles(theme).chatInfoContainer}>
          <Text style={styles(theme).username}>User name</Text>
          <Text style={styles(theme).message}>last message last message</Text>
        </View>
        <View style={styles(theme).timeContainer}>
          <Text style={styles(theme).time}>9:49 AM</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    image: {
      width: 48,
      height: 48,
      borderRadius: 100,
      borderColor: theme.pageColor,
      borderWidth: 1,
    },
    chatBlockContainer: {
      flexDirection: "row",
      height: 80,
      alignItems: "center",
    },
    imageContainer: {
      width: "20%",
      height: "100%",
      justifyContent: "center",
      paddingLeft: 24,
    },
    chatInfoContainer: {
      width: "60%",
      height: 80,
      justifyContent: "center",
      lineHeight: 40,
      paddingLeft: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.grey1,
    },
    username: {
      lineHeight: 30,
      fontSize: 17,
      fontFamily: "SFProDisplay-Medium",
      color: theme.defaultTextColor,
    },
    message: {
      lineHeight: 30,
      fontSize: 15,
      fontFamily: "SFProDisplay-Regular",
      color: theme.defaultTextColor,
    },
    timeContainer: {
      height: 80,
      paddingTop: 18,
      width: "20%",
      borderBottomWidth: 1,
      borderBottomColor: theme.grey1,
    },
    time: {
      fontFamily: "SFProDisplay-Regular",
      fontSize: 12,
      color: theme.defaultTextColor,
    },
  });
