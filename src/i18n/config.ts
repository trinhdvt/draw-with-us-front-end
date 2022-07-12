import * as i18n from "i18next";
import {initReactI18next} from "react-i18next";

import translationEn from "./locales/en/translation.json";
import translationVi from "./locales/vi/translation.json";

const resources = {
    en: translationEn,
    vi: translationVi,
};

i18n.use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        defaultNS: "common",
        interpolation: {
            escapeValue: false,
        },
    })
    .then();

export default i18n;
