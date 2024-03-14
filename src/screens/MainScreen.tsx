import React, { useCallback } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import LinearGradient from "react-native-linear-gradient";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { MenuButtons } from "../components/MenuButtons";
import { useSelector } from "react-redux";
import { MapSection } from "../sections/MapSection";
import { RootState } from "../store/store";
import { Ttheme } from "../themes";
import env from "../env";
import { useNavigation } from "@react-navigation/native";
import { MapStackNavigation } from "../types/navigationTypes";
import { useSocketIo } from "../api/socket";

export const MainScreen = () => {
  const navigation = useNavigation<MapStackNavigation>();

  const { theme, mapStyle } = useCustomThemeColors();
  const { fileName, userId } = useSelector(
    (state: RootState) => state.userReducer
  );
  const {
    map,
    contentContainer,
    linearGradient,
    container,
    profileButton,
    imageStyles,
  } = styles(theme);

  const onProfilePressHandler = useCallback(() => {
    navigation.navigate("profilePage");
  }, []);

  useSocketIo({ enabled: Boolean(userId), userId: userId! });

  return (
    <View style={container}>
      <TouchableOpacity onPress={onProfilePressHandler} style={profileButton}>
        <Image style={imageStyles} source={{ uri: env.filesUrl + fileName }} />
      </TouchableOpacity>

      <MapView
        showsUserLocation={true}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={map}
      />
      <View style={contentContainer}>
        <LinearGradient
          colors={[theme.linearGradient, theme.pageColor]}
          style={linearGradient}
        />
        <MapSection />
      </View>
      <MenuButtons />
    </View>
  );
};

// TODO: type styles
const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
      justifyContent: "flex-end",
      alignItems: "center",
      position: "relative",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
      height: Dimensions.get("window").height * 0.7,
      width: Dimensions.get("window").width,
      position: "absolute",
      bottom: 0,
      backgroundColor: theme.pageColor,
    },
    linearGradient: {
      width: Dimensions.get("window").width,
      height: 40,
      position: "absolute",
      top: -40,
    },
    profileButton: {
      width: 52,
      height: 52,
      borderRadius: 52,
      position: "absolute",
      top: 63,
      right: 24,
      zIndex: 999,
      backgroundColor: theme.profileButtonBg,
      justifyContent: "center",
      alignItems: "center",
    },
    imageStyles: {
      width: 42,
      height: 42,
      borderRadius: 42,
    },
  });
