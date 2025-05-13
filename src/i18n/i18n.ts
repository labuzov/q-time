import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { i18nLang } from './types';

const HttpApi = new HttpBackend(null, {
    loadPath: '/locales/{{lng}}.json'
});

const lng: i18nLang = 'ru';
const fallbackLng: i18nLang = 'en';

i18n
    .use(initReactI18next)
    .use(HttpApi)
    .init({
        lng,
        fallbackLng,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;