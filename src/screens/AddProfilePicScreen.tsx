import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";
// @ts-ignore
import CameraIcon from "../media/svg/camera.svg";
// @ts-ignore
import CocktailIcon from "../media/svg/cocktail.svg";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  checkUserUserEndpoint,
  postUserInstagramPictures,
  registerUserWithAvatar,
} from "../api/backendApi";
import { check, PERMISSIONS, request } from "react-native-permissions";
import { getMediaById, getMediaIds } from "../api/instagramApi";
import { IuserMediaObject } from "../store/user/userTypes";
import { useTranslation } from "react-i18next";
import {
  loginUser,
  saveUserData,
  setUserInstagramPictures,
} from "../store/user/userBuilder";
import { createFormData } from "../utils/Helper";

export const AddProfilePicScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { theme } = useCustomThemeColors();
  const [image, setImage] = useState<Asset | null>(null);
  const { userId, access_token, isAdmin, username } = useSelector(
    (state: RootState) => state.userReducer
  );

  const choosePhotoHandler = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
    });

    if (result.assets) {
      setImage(result.assets[0]);
    }
  }, []);

  const uploadPhoto = useCallback(async () => {
    await registerUserWithAvatar(
      createFormData(image, { userId, access_token, isAdmin, username })
    );
    let userMediaPromises: Promise<IuserMediaObject>[] = [];
    try {
      const mediaIds = await getMediaIds({
        fields: "id,caption",
        access_token: access_token,
      });
      try {
        for (let i = 0; i < mediaIds.data.length; i++) {
          const mediaData = getMediaById({
            mediaId: mediaIds.data[i].id,
            access_token: access_token,
          });
          userMediaPromises.push(mediaData);
        }
      } catch (e) {
        console.log({ e });
      }
    } catch (e) {
      console.log({ e });
    }
    Promise.all(userMediaPromises).then(async (data) => {
      dispatch(setUserInstagramPictures(data));
      await postUserInstagramPictures({
        //@ts-ignore
        userId,
        user_media: data,
      });
    });

    const { newUser, user } = await checkUserUserEndpoint({
      userId,
      access_token,
      isAdmin,
      username,
      fileName: "",
    });

    if (newUser) {
      dispatch(saveUserData(user));
    } else {
      dispatch(
        saveUserData({
          userId,
          access_token,
          isAdmin,
          username,
          fileName: image?.fileName || "",
        })
      );
    }

    dispatch(loginUser({}));
  }, [image]);

  useEffect(() => {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((result) => {
        // console.log({ result });
      })
      .catch((error) => {
        console.log({ error });
      });
    check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((request) => {
      // console.log({ request });
    });
  }, []);

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).titleStyle}>Upload your photo</Text>
      <TouchableOpacity
        onPress={choosePhotoHandler}
        style={styles(theme).avaPlaceholder}
      >
        <View style={styles(theme).iconContainer}>
          <CameraIcon fill={theme.defaultTextColor} />
        </View>
        {image ? (
          <Image
            style={[
              styles(theme).avaPlaceholder,
              { position: "absolute", zIndex: -1 },
            ]}
            source={{ uri: image.uri }}
          />
        ) : (
          <CocktailIcon width="40" height="40" fill={theme.borderColor} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles(theme).buttonStyles}
        onPress={uploadPhoto}
      >
        <Text>{t("upload")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    titleStyle: {
      fontSize: 20,
      color: theme.defaultTextColor,
    },
    avaPlaceholder: {
      marginTop: 15,
      height: 120,
      width: 120,
      borderWidth: 1,
      borderRadius: 120,
      borderColor: theme.borderColor,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    iconContainer: {
      position: "absolute",
      right: 0,
      top: 0,
      width: 30,
      borderRadius: 30,
      height: 30,
      backgroundColor: theme.menuActiveColor,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonStyles: {
      width: 100,
      padding: 10,
      borderRadius: 20,
      backgroundColor: theme.menuActiveColor,
      color: theme.defaultTextColor,
      marginTop: 10,
      alignItems: "center",
    },
  });
