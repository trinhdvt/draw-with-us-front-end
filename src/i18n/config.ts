import * as i18n from "i18next";
import {initReactI18next} from "react-i18next";

import translationEn from "./locales/en.json";
import translationVi from "./locales/vi.json";

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
        react: {
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ["br", "strong", "b", "i"],
        },
    })
    .then();

export default i18n;
