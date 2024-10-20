import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const Languages = ["en","hi"];

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng:'en',
    fallbackLng: "en",
    debug: false,
    whitelist: Languages,
    interpolation: {
      escapeValue: false,
    },
  });