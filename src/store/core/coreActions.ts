import { createAction } from "@reduxjs/toolkit";
import { EcoreActionTypes } from "./coreActionTypes";

export const changePage = createAction<number, EcoreActionTypes>(
  EcoreActionTypes.CHANGE_PAGE
);

export const setLocale = createAction<string, EcoreActionTypes>(
  EcoreActionTypes.SET_LOCALE
);
