import { NavigationProp } from "@react-navigation/native";

export type MapStackParamList = {
  Main: undefined;
  Chats: undefined;
  AddProfilePic: undefined;
  profilePage: undefined;
  profileSettings: undefined;
  AddProfilePicMainNav: undefined;
  qrCodeScreen: undefined;
  qrCodeScannerScreen: undefined;
};

export type MapStackNavigation = NavigationProp<MapStackParamList>;
