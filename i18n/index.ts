import en from './en.yml';

import type {InternationalizedStrings} from './types';

export type InternationalizedString = keyof InternationalizedStrings;
export type {InternationalizedStrings};

const VARIABLES_REGEX = /\{([^}]+)\}/g;

function compileTemplates(
  strings: InternationalizedStrings
): InternationalizedStrings {
  const output = {};

  for (const name in strings) {
    if (name.endsWith('Template')) {
      output[name] = params => {
        return strings[name].replace(VARIABLES_REGEX, (_, name) => {
          return params[name];
        });
      };
    } else {
      output[name] = strings[name];
    }
  }

  return output as InternationalizedStrings;
}

const i18nMessages = {
  en: compileTemplates(en)
};

export type SupportedLanguages = keyof typeof i18nMessages;

export default i18nMessages;
