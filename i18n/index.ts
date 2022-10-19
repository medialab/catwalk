import en from './en.yml';

const i18nMessages = {
  en
};

export type SupportedLanguages = keyof typeof i18nMessages;

export default i18nMessages;
