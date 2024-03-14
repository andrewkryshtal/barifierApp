import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { IuserMediaObject, IUserReducer } from "../store/user/userTypes";
import { checkUserUserEndpoint } from "../api/backendApi";
// @ts-ignore
import InstagramLogin from "react-native-instagram-login";
// @ts-ignore
import VectorMain from "../media/svg/vectorMain.svg";
// @ts-ignore
import VectorSlave from "../media/svg/vectorSlave.svg";
// @ts-ignore
import InstagramIcon from "../media/svg/instagram.svg";
import { getMediaById, getMediaIds, getProfileInfo } from "../api/instagramApi";
import { useNavigation } from "@react-navigation/native";
import { Ttheme } from "../themes";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { MapStackNavigation } from "../types/navigationTypes";
import { loginUser, saveUserData } from "../store/user/userBuilder";

export const LoginScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const [isAdminState, setisAdminState] = useState<boolean>(false);
  const loginRef = useRef<any>();
  const navigation = useNavigation<MapStackNavigation>();
  const { theme } = useCustomThemeColors();
  const onLoginSuccessHandler = useCallback(
    async (data: IUserReducer) => {
      let usernameVariable;
      let userMediaPromises: Promise<IuserMediaObject>[] = [];

      const profileInfo = await getProfileInfo({
        fields: "id,username",
        access_token: data.access_token,
      });
      usernameVariable = profileInfo.username;

      try {
        const { newUser, user } = await checkUserUserEndpoint({
          ...data,
          userId: data.user_id,
          isAdmin: isAdminState,
          username: usernameVariable,
        });

        if (newUser) {
          dispatch(
            saveUserData({
              ...data,
              userId: data.user_id,
              isAdmin: isAdminState,
              username: usernameVariable,
            })
          );
          navigation.navigate("AddProfilePic");
        } else {
          try {
            const mediaIds = await getMediaIds({
              fields: "id,caption",
              access_token: data.access_token,
            });
            try {
              for (let i = 0; i < mediaIds.data.length; i++) {
                const mediaData = getMediaById({
                  mediaId: mediaIds.data[i].id,
                  access_token: data.access_token,
                });
                userMediaPromises.push(mediaData);
              }
            } catch (e) {
              console.log({ e });
            }
          } catch (e) {
            console.log({ e });
          }

          dispatch(saveUserData(user));
          dispatch(loginUser({}));
        }
      } catch (e) {
        throw Error("error on loginUserEndpoint");
      }
    },
    [isAdminState]
  );

  return (
    <>
      <VectorMain width={windowWidth} />
      <VectorSlave style={styles(theme).vectorSlaveStyles} />
      <Text style={styles(theme).logoTitle}>Barifier.</Text>
      <View style={styles(theme).container}>
        <TouchableOpacity
          style={styles(theme).loginButton}
          onPress={() => loginRef?.current?.show()}
        >
          <View style={styles(theme).loginTextWrapper}>
            <Text style={styles(theme).loginText}>Login using Instagram</Text>
            <InstagramIcon />
          </View>
        </TouchableOpacity>
      </View>

      <InstagramLogin
        ref={loginRef}
        appId="789186218948377"
        appSecret="aedeb323839fea0ae218ca4ee5a5cec1"
        redirectUrl={encodeURI("https://www.google.com/")}
        scopes={["user_profile", "user_media"]}
        onLoginSuccess={onLoginSuccessHandler}
        onLoginFailure={(data: any) => console.log({ dataError: data })}
      />
    </>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: "45%",
    },
    checkboxWrapper: {
      flexDirection: "row",
    },
    vectorSlaveStyles: {
      position: "absolute",
      right: 0,
      top: 200,
    },
    logoTitle: {
      fontFamily: "SFProDisplay-Bold",
      fontSize: 48,
      position: "absolute",
      top: "35%",
      left: 60,
      color: theme.defaultTextColor,
    },
    loginButton: {
      alignItems: "center",
      justifyContent: "center",
      width: "85%",
      height: 38,
      textAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      margin: "auto",
      borderRadius: 50,
    },
    loginText: {
      fontFamily: "SFProDisplay-Medium",
      color: theme.defaultTextColor,
      marginRight: 5,
    },
    loginTextWrapper: {
      flexDirection: "row",
    },
  });
