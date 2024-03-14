import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { updateUserSettingsEndpoint } from "../../api/backendApi";
import { EusersActionTypes } from "./userActionTypes";
import { IUserReducer } from "./userTypes";

export const userReducerDefaultValues: IUserReducer = {
  access_token: "",
  isAdmin: false,
  userId: undefined,
  username: "",
  user_media: [],
  loggedIn: false,
  fileName: "",
  showCheckIns: true,
  showFavourites: true,
  hideMyselfOnMap: false,
  fullName: "",
  birthDate: undefined,
};

export const fetchUpdatedUserSettingsAction = createAsyncThunk<
  any,
  Record<string, any>
>(
  EusersActionTypes.UPDATE_USER_DATA,
  async (userData: Partial<IUserReducer>, thunkAPI) => {
    //@ts-ignore
    const userId = thunkAPI.getState().userReducer.userId;

    try {
      const response = await updateUserSettingsEndpoint({
        userId,
        ...userData,
      });

      return response;
    } catch (e) {
      throw e;
    }
  }
);

export const userReducer = createSlice<
  IUserReducer,
  SliceCaseReducers<IUserReducer>
>({
  name: "user",
  initialState: userReducerDefaultValues,
  reducers: {
    logoutUser: () => userReducerDefaultValues,
    setUserInstagramPictures: (state, { payload }) => ({
      ...state,
      user_media: payload,
    }),
    loginUser: (state) => ({
      ...state,
      loggedIn: true,
    }),
    saveUserData: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUpdatedUserSettingsAction.fulfilled,
      (state, payload) => {
        return {
          ...state,
          ...payload.meta.arg,
        };
      }
    );
  },
});

export const { logoutUser, loginUser, saveUserData, setUserInstagramPictures } =
  userReducer.actions;
