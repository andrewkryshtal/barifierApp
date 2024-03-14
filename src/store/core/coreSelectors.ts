import { store, useRootSelector } from "../store";

export const usePageIndex = () =>
  useRootSelector((store) => store.coreReducer.pageIndex);

export const useLocalization = () =>
  useRootSelector((store) => store.coreReducer.locale);
