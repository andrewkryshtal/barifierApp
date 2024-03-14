import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { IfriendsReducer } from "./friendsTypes";

export const friendsReducerDefaultValues = { friends: [] };

// export const getAllFriendsAction = createAsyncThunk<any, any>(EfriendsActionTypes.GET_ALL_FRIENDS, async () => {});

export const friendsReducer = createSlice<
  IfriendsReducer,
  SliceCaseReducers<IfriendsReducer>
>({
  name: "friends",
  initialState: friendsReducerDefaultValues,
  reducers: {
    setAllFriends: (state, { payload }) => {
      return {
        ...state,
        friends: payload,
      };
    },
  },
});

export const { setAllFriends } = friendsReducer.actions;
