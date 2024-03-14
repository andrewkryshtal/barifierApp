import React, { useEffect } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import { LoginNavigator } from "./navigators/LoginNavigator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Linking, useColorScheme } from "react-native";
import { themes } from "./themes";
import { MainScreen } from "./screens/MainScreen";
import * as RNLocalize from "react-native-localize";
import { setLocale } from "./store/core/coreActions";
import { i18n } from "./i18n/i18n";
import { useLocalization } from "./store/core/coreSelectors";
import { MapNavigator } from "./navigators/MapNavigator";
import { getAllFriendsEndpoint } from "./api/backendApi";
import { setAllFriends } from "./store/friends/friendsBuilder";

export const InitialComponent = () => {
  const dispatch = useDispatch();
  const { loggedIn, userId } = useSelector(
    (store: RootState) => store.userReducer
  );

  const scheme = useColorScheme();
  const systemLocales = RNLocalize.getLocales();
  const locale = useLocalization();

  const deeplinkHandler = ({ url }: { url: string }) => {
    console.log({ url });
  };

  useEffect(() => {
    Linking.addEventListener("url", deeplinkHandler);
    dispatch(setLocale("us")); //systemLocales[0].languageCode
    i18n.changeLanguage(locale);

    (async () => {
      const { friends } = await getAllFriendsEndpoint(userId!);
      dispatch(getAllFriends(friends));
    })();
  }, []);

  return (
    <>
      <NavigationContainer
        theme={scheme === "light" ? themes.lightTheme : themes.darkTheme}
      >
        {!loggedIn ? <LoginNavigator /> : <MapNavigator />}
      </NavigationContainer>
    </>
  );
};
