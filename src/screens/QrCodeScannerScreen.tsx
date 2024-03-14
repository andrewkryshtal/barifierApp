import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from "react-native-vision-camera";
import { useScanBarcodes, BarcodeFormat } from "vision-camera-code-scanner";
import { CustomHeader } from "../components/CustomHeader";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";
import { MapStackParamList } from "../types/navigationTypes";
import { useToast } from "react-native-toast-notifications";

type TQrCodeScannerScreen = NativeStackScreenProps<
  MapStackParamList,
  "qrCodeScannerScreen"
>;

export const QrCodeScannerScreen = ({ route }: TQrCodeScannerScreen) => {
  const toast = useToast();
  const { theme } = useCustomThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [permission, setPermission] = useState<string | undefined>(undefined);
  const [coords, setCoord] = useState({ locationX: 10, locationY: 10 });
  const onReadCodeWrapper = (data: any) => {
    navigation.goBack();
  };

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const onPressCameraView = useCallback((evt: any) => {
    const { locationX, locationY } = evt.nativeEvent;
    setCoord({ locationX, locationY });
  }, []);

  useEffect(() => {
    if (barcodes.length !== 0) {
      console.log(barcodes[0]);
      console.log("add friend here");

      toast.show("Friend Added!", { type: "success" });
      navigation.goBack();
    }
  }, [barcodes]);

  const isFocused = useIsFocused();

  const device = useCameraDevices("wide-angle-camera");

  const getPermissionAsync = async () => {
    try {
      const cameraPermissionStatus = await Camera.getCameraPermissionStatus();
      if (cameraPermissionStatus) {
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission === "authorized") {
          setPermission(newCameraPermission);
        }
      }
    } catch (e) {}
  };

  //useLayoutEffect
  useEffect(() => {
    getPermissionAsync();
  }, [isFocused]);

  return (
    permission === "authorized" && (
      <Camera
        style={[{ flex: 1, height: "100%", width: "100%" }]}
        device={device.back!}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      >
        <CustomHeader
          navigation={navigation}
          backgroundColor={"transparent"}
          options={{ title: t("scanQrCode") }}
        />
        <TouchableOpacity style={{ flex: 1 }} onPress={onPressCameraView}>
          {/* made for autofocus */}
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "transparent",
              position: "relative",
              top: coords.locationY,
              left: coords.locationX,
            }}
          />
          {/* {barcodes.map((barcode, idx) => (
            <Text key={idx} style={styles(theme).barcodeTextURL}>
              {barcode.displayValue}
            </Text>
          ))} */}
        </TouchableOpacity>
      </Camera>
    )
  );
  // <Camera style={StyleSheet.absoluteFill} device={device!} isActive={true} />
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    barcodeTextURL: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
    },
  });
