import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { barsReducer } from "./bars/barsBuilder";
import { coreReducer } from "./core/coreBuilder";
import { friendsReducer } from "./friends/friendsBuilder";
import { userReducer } from "./user/userBuilder";

const createDebugger = require("redux-flipper").default;

const persistUserConfig = {
  key: "user",
  storage: AsyncStorage,
};

const persistFriendsConfig = {
  key: "friends",
  storage: AsyncStorage,
};

const persistedUserReducer = persistReducer(
  persistUserConfig,
  userReducer.reducer
);

const persistedFriendsReducer = persistReducer(
  persistFriendsConfig,
  friendsReducer.reducer
);

const rootReducer = combineReducers({
  userReducer: persistedUserReducer,
  friendsReducer: persistedFriendsReducer,
  barsReducer,
  coreReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(createDebugger());
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface IGenericUseState<T> {
  payload: T;
}

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
