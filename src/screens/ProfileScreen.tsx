import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { ButtonTypes, CustomButton } from "../components/CustomButton";
import env from "../env";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { RootState } from "../store/store";
import { Ttheme } from "../themes";
import { MapStackNavigation } from "../types/navigationTypes";
//@ts-ignore
import EditIcon from "../media/svg/editIcon.svg";
//@ts-ignore
import AddUserIcon from "../media/svg/AddUserIcon.svg";

export const ProfileScreen = () => {
  const navigation = useNavigation<MapStackNavigation>();
  const { t } = useTranslation();
  const { theme } = useCustomThemeColors();
  const dimentions = useWindowDimensions();
  const { fileName, username } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const onSettingsPress = () => {
    navigation.navigate("profileSettings");
  };

  const onAddFriendHandler = useCallback(() => {
    navigation.navigate("qrCodeScreen");
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: t("profile"),
      rightButtonShown: true,
      onPressHandler: onAddFriendHandler,
      RightIcon: () => <AddUserIcon width={28} fill={theme.defaultTextColor} />,
    });
  }, [theme]);

  return (
    <ScrollView style={styles(theme).container}>
      <View
        style={[
          styles(theme).imageContainer,
          { height: dimentions.height * 0.5 },
        ]}
      >
        <Image
          style={{ height: dimentions.height * 0.5, borderRadius: 24 }}
          source={{ uri: env.filesUrl + fileName }}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
          style={styles(theme).gradient}
        >
          <Text style={styles(theme).username}>@{username}</Text>
        </LinearGradient>
      </View>
      <CustomButton
        type={ButtonTypes.secondary}
        containerStyles={{ marginTop: 24, width: "100%" }}
        buttonText={t("editProfile")}
        onPressHandler={onSettingsPress}
        Icon={() => <EditIcon fill={theme.defaultTextColor} />}
      />

      <View style={styles(theme).divider} />

      <View style={styles(theme).tabsContainer}>
        <View style={styles(theme).tabsItem}>
          <TouchableOpacity
            style={[
              styles(theme).tabButton,
              selectedTab === "1" && styles(theme).tabButtonSelected,
            ]}
            onPress={() => setSelectedTab("1")}
          >
            <Text style={styles(theme).tabText}>{t("favPlaces")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles(theme).tabButton,
              selectedTab === "2" && styles(theme).tabButtonSelected,
            ]}
            onPress={() => setSelectedTab("2")}
          >
            <Text style={styles(theme).tabText}>{t("checkIns")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles(theme).tabButton,
              selectedTab === "3" && styles(theme).tabButtonSelected,
            ]}
            onPress={() => setSelectedTab("3")}
          >
            <Text style={styles(theme).tabText}>{t("checkIns")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 18,
    },
    imageContainer: {
      overflow: "visible",
      position: "relative",
      width: "100%",
      borderRadius: 24,
      backgroundColor: "#000",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
    },
    gradient: {
      justifyContent: "center",
      position: "absolute",
      paddingLeft: 18,
      width: "100%",
      height: 100,
      bottom: 0,
      borderRadius: 24,
    },
    username: {
      color: "#fff",
      fontFamily: "SFProDisplay-Medium",
      fontSize: 24,
    },
    tabsContainer: {
      marginTop: 16,
      height: 32,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.tabSwitcherBgColor,
      borderRadius: 8,
    },
    tabsItem: {
      flexDirection: "row",
    },
    tabButton: {
      width: "32%",
      justifyContent: "center",
      alignItems: "center",
    },
    tabButtonSelected: {
      backgroundColor: theme.tabActiveColor,
      height: 24,
      borderRadius: 8,
    },
    tabText: {
      color: theme.defaultTextColor,
    },
    divider: {
      marginTop: 24,
      width: "120%",
      marginLeft: "-10%",
      height: 1,
      backgroundColor: theme.borderColor,
    },
  });
