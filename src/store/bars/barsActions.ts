import { createAction } from "@reduxjs/toolkit";
import { EbarActionTypes } from "./barsActionTypes";
import { IFsqBarInterface, IGoogleBarInterface } from "./barsTypes";

export const clearAllBars = createAction<undefined, EbarActionTypes>(
  EbarActionTypes.CLEAR_ALL_BARS
);

export const addFsqFoundBars = createAction<
  IFsqBarInterface[],
  EbarActionTypes
>(EbarActionTypes.ADD_FSQ_FOUND_BARS);

export const addGoogleFoundBars = createAction<
  IGoogleBarInterface[],
  EbarActionTypes
>(EbarActionTypes.ADD_GOOGLE_FOUND_BARS);
