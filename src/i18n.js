import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/locales/en.json";
import fr from "../assets/locales/fr.json";
import "intl-pluralrules";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: en,
    fr: fr,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
