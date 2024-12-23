// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar archivos de traducción
import esTranslation from './locales/es/translation.json';
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esTranslation
      },
      en: {
        translation: enTranslation
      },
      fr: {
        translation: frTranslation
      }
    },
    lng: 'es', // idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false // no se necesita para React
    }
  });

export default i18n;