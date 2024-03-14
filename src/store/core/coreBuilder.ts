import { createReducer } from "@reduxjs/toolkit";
import { changePage, setLocale } from "./coreActions";
import { IcoreReducer } from "./coreTypes";

export const coreReducerDefaultValues: IcoreReducer = {
  locale: "US",
  pageIndex: 0,
  geolocationInfo: {},
  weatherInfo: {},
};

export const coreReducer = createReducer<IcoreReducer>(
  coreReducerDefaultValues,
  (builder) => {
    builder.addCase(changePage, (state, { payload }) => ({
      ...state,
      pageIndex: payload,
    }));
    builder.addCase(setLocale, (state, { payload }) => ({
      ...state,
      locale: payload,
    }));
  }
);
