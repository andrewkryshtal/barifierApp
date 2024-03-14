import { createReducer } from "@reduxjs/toolkit";
import {
  addFsqFoundBars,
  addGoogleFoundBars,
  clearAllBars,
} from "./barsActions";
import { IBarsReducer } from "./barsTypes";

const barReducerDefaultValue = {
  fsqBars: [],
  googleBars: [],
};

export const barsReducer = createReducer<IBarsReducer>(
  barReducerDefaultValue,
  (builder) => {
    builder.addCase(addFsqFoundBars, (state, { payload }) => {
      return {
        ...state,
        fsqBars: [...state.fsqBars, ...payload],
      };
    });
    builder.addCase(clearAllBars, () => {
      return {
        fsqBars: [],
        googleBars: [],
      };
    });
    builder.addCase(addGoogleFoundBars, (state, { payload }) => {
      return {
        ...state,
        googleBars: [...state.googleBars, ...payload],
      };
    });
  }
);
