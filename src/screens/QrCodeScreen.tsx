import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import env from "../env";
import { RootState } from "../store/store";
import QRCode from "react-native-qrcode-svg";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";
import { ButtonTypes, CustomButton } from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MapStackParamList } from "../types/navigationTypes";
// import { socketConnection } from "../api/socket";

type TQrCodeScreen = NativeStackScreenProps<MapStackParamList, "qrCodeScreen">;

export const QrCodeScreen = ({ navigation }: TQrCodeScreen) => {
  const { t } = useTranslation();
  const { theme } = useCustomThemeColors();

  const { userId } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    navigation.setOptions({
      title: t("addFriend") as string,
    });
    // socketConnection.emit("testSocketData");
  }, []);

  const link = env.deeplinkUrlScheme + `addFriend/${userId}`;

  const qrCodeScannerHandler = () => {
    navigation.navigate("qrCodeScannerScreen");
  };

  return (
    <View>
      <Text style={styles(theme).qrTextStyle}>
        To add friend and see her/his fav locations, checkins sos requests, just
        scan this qr code
      </Text>
      <View style={styles(theme).qrCodeStyle}>
        <QRCode size={200} value={link} />
      </View>
      <View style={styles(theme).divider}></View>
      <Text style={styles(theme).qrTextStyle}>
        Use QR code scanner to add friends
      </Text>
      <View style={styles(theme).buttonContainer}>
        <CustomButton
          onPressHandler={qrCodeScannerHandler}
          type={ButtonTypes.primary}
          buttonText={t("scanQrCode")}
          containerStyles={{ width: "48,5%" }}
        />
      </View>
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    qrCodeStyle: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
    },
    qrTextStyle: {
      color: theme.defaultTextColor,
      textAlign: "center",
      fontFamily: "SFProDisplay-Medium",
      fontSize: 18,
      marginVertical: 10,
    },
    buttonContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    divider: {
      position: "relative",
      width: "100%",
      height: 1,
      backgroundColor: theme.borderColor,
      marginVertical: 40,
    },
  });
