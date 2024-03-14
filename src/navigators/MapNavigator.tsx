import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CustomHeader } from "../components/CustomHeader";
import { ChatsScreen } from "../screens/ChatsScreen";
import { MainScreen } from "../screens/MainScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ProfileSettings } from "../screens/ProfileSettings";
import { QrCodeScannerScreen } from "../screens/QrCodeScannerScreen";
import { QrCodeScreen } from "../screens/QrCodeScreen";
import { MapStackParamList } from "../types/navigationTypes";

export const MapNavigator = () => {
  const Stack = createNativeStackNavigator<MapStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerShown: true,
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="profilePage"
        component={ProfileScreen}
        options={{
          headerShown: true,
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="profileSettings"
        component={ProfileSettings}
        options={{
          headerShown: true,
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="qrCodeScreen"
        component={QrCodeScreen}
        options={{
          headerShown: true,
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="qrCodeScannerScreen"
        component={QrCodeScannerScreen as React.FC}
      />
    </Stack.Navigator>
  );
};
