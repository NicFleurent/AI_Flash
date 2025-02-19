//Source :
//https://medium.com/@lasithherath00/implementing-react-native-i18n-and-language-selection-with-asyncstorage-b24ae59e788e

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import fr from './fr.json';

const resources = {
  fr: fr,
};

i18n

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'fr',// default language to use.
  });

export default {i18n};