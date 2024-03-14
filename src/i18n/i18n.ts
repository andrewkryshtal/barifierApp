import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { store } from "../store/store";
import en from "./en.json";
import ua from "./ua.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  fallbackLng: "en",
  resources: {
    en: en,
    ua: ua,
    uk: en,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: {
    useSuspense: false,
  },
});

export { i18n };
