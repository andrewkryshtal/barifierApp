/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store/store";
import { InitialComponent } from "./src/InitialComponent";
import { Text } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <ToastProvider>
        <InitialComponent />
      </ToastProvider>
    </PersistGate>
  </Provider>
);
export default App;
