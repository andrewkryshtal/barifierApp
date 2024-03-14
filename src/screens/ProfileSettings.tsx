import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../api/backendApi";
import { ButtonTypes, CustomButton } from "../components/CustomButton";
import { CustomDatePicker } from "../components/CustomDatePicker";
import { CustomSwitcherComponent } from "../components/CustomSwitcherComponent";
import { CustomTextInput } from "../components/CustomTextInput";
import env from "../env";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { RootState } from "../store/store";
import {
  fetchUpdatedUserSettingsAction,
  logoutUser,
} from "../store/user/userBuilder";
import { Ttheme } from "../themes";
import { MapStackNavigation } from "../types/navigationTypes";
import { createFormData } from "../utils/Helper";
import CookieManager from "@react-native-community/cookies";

export const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<MapStackNavigation>();
  const { t } = useTranslation();
  const { theme } = useCustomThemeColors();

  const {
    userId,
    fullName,
    fileName,
    username,
    showCheckIns,
    showFavourites,
    hideMyselfOnMap,
    birthDate,
  } = useSelector((store: RootState) => store.userReducer);

  const [fullNameState, setfullNameState] = useState(fullName ?? "");
  const [nickname, setNickname] = useState(username ?? "");

  //TODO: make it from backend
  const [hideMyself, setHideMyself] = useState(hideMyselfOnMap ?? false);
  const [showFavOther, setShowFavOther] = useState(showFavourites ?? false);
  const [showCheckInsState, setshowCheckInsState] = useState(
    showCheckIns ?? false
  );

  useEffect(() => {
    navigation.setOptions({ title: t("settings"), rightButtonShown: false });
  }, []);

  useEffect(() => {
    dispatch(
      //@ts-ignore
      fetchUpdatedUserSettingsAction({
        showCheckIns: showCheckInsState,
        hideMyselfOnMap: hideMyself,
        showFavourites: showFavOther,
      })
    );
  }, [hideMyself, showCheckInsState, showFavOther]);

  const onChangeSettingsHandler = (arg: Record<string, any>) => {
    //@ts-ignore
    dispatch(fetchUpdatedUserSettingsAction(arg));
  };

  const onDateChangeHandler = (date: Date) => {
    //@ts-ignore
    dispatch(fetchUpdatedUserSettingsAction({ birthDate: date.toJSON() }));
  };

  const removePhotoHandler = useCallback(async () => {
    const { filename } = await deleteAvatar({ userId });

    dispatch(
      //@ts-ignore
      fetchUpdatedUserSettingsAction({ fileName: null })
    );
  }, []);

  const uploadNewPhotoHandler = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
    });

    if (result.assets) {
      const { fileName } = await uploadAvatar(
        createFormData(result.assets[0], { userId })
      );
      console.log({ fileName });

      dispatch(
        //@ts-ignore
        fetchUpdatedUserSettingsAction({ fileName })
      );
    }
  }, []);

  const onDeactivateHandler = useCallback(() => {
    CookieManager.clearAll(true).then((res) => {
      console.log("CookieManager.clearAll =>", res);
      dispatch(logoutUser({}));
    });
  }, []);

  const onDeleteHandler = useCallback(() => {
    console.log("onDeleteHandler");
  }, []);

  return (
    <ScrollView style={styles(theme).container}>
      <View style={styles(theme).avatarFlex}>
        <View style={styles(theme).imageContainer}>
          <Image
            style={{ height: 160, width: 120, borderRadius: 12 }}
            source={{ uri: env.filesUrl + fileName }}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
            style={styles(theme).gradient}
          />
        </View>
        <View style={styles(theme).buttonContainer}>
          <CustomButton
            buttonText={"Remove photo"}
            type={ButtonTypes.secondary}
            onPressHandler={removePhotoHandler}
            containerStyles={{ width: "90%" }}
          />
          <CustomButton
            buttonText={"Upload new"}
            type={ButtonTypes.secondary}
            onPressHandler={uploadNewPhotoHandler}
            containerStyles={{ width: "90%", marginTop: 10 }}
          />
        </View>
      </View>
      <CustomTextInput
        placeHolder={"Your name"}
        value={fullNameState ?? ""}
        setValue={setfullNameState}
        label={t("fullname")}
        disabled={fullName!.length > 0}
        onPressHandler={() =>
          onChangeSettingsHandler({ fullName: fullNameState })
        }
      />
      <CustomTextInput
        placeHolder={"Your nickname"}
        value={nickname}
        setValue={setNickname}
        label={t("nickname")}
        onPressHandler={() => onChangeSettingsHandler({ username: nickname })}
      />
      <CustomDatePicker
        label={t("birthLabel")}
        value={birthDate ?? null}
        onDateChangeHandler={onDateChangeHandler}
      />
      <Text style={styles(theme).privateSectionText}>Private</Text>
      <CustomSwitcherComponent
        label={t("hideMyself")}
        value={hideMyself}
        onChange={setHideMyself}
      />
      <CustomSwitcherComponent
        label={t("showFavOther")}
        value={showFavOther}
        onChange={setShowFavOther}
      />
      <CustomSwitcherComponent
        label={t("showCheckInsState")}
        value={showCheckInsState}
        onChange={setshowCheckInsState}
      />
      <CustomButton
        containerStyles={{ width: "100%", marginTop: 24 }}
        buttonText={t("deactivateAcc")}
        type={ButtonTypes.secondary}
        onPressHandler={onDeactivateHandler}
      />
      <CustomButton
        containerStyles={{ width: "100%", marginTop: 24, marginBottom: 50 }}
        buttonText={t("deleteAcc")}
        type={ButtonTypes.warning}
        onPressHandler={onDeleteHandler}
      />
    </ScrollView>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingVertical: 20,
    },
    avatarFlex: {
      flexDirection: "row",
    },
    imageContainer: {
      overflow: "visible",
      position: "relative",
      width: 120,
      borderRadius: 12,
      backgroundColor: "#000",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.58,
      shadowRadius: 8.0,
      zIndex: 999,
      elevation: 24,
    },
    gradient: {
      justifyContent: "center",
      position: "absolute",
      paddingLeft: 18,
      width: 120,
      height: 100,
      bottom: 0,
      borderRadius: 12,
    },
    privateSectionText: {
      color: theme.defaultTextColor,
      fontSize: 16,
      marginTop: 20,
    },
    buttonContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: "65%",
      marginLeft: 10,
    },
  });
