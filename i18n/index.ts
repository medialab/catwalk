import en from './en.yml';

import type {InternationalizedStrings} from './types';

export type InternationalizedString = keyof InternationalizedStrings;
export type {InternationalizedStrings};

const i18nMessages = {
  en
};

export type SupportedLanguages = keyof typeof i18nMessages;

export default i18nMessages;
