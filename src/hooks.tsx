import {useContext} from 'react';

import {LangContext} from './contexts';
import i18nMessages from '../i18n';

export function useI18nMessages() {
  const currentLang = useContext(LangContext);

  return i18nMessages[currentLang];
}
