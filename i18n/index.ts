import en from './en.yml';

import type {InternationalizedStrings} from './types';

export type InternationalizedString = keyof InternationalizedStrings;
export type {InternationalizedStrings};

const VARIABLES_REGEX = /\{([^}]+)\}/g;

function compileTemplates(
  strings: InternationalizedStrings
): InternationalizedStrings {
  const output = {} as Record<string, unknown>;

  for (const name in strings) {
    if (name.endsWith('Template')) {
      output[name] = (params: Record<string, string | number>) => {
        return (strings[name as InternationalizedString] as string).replace(
          VARIABLES_REGEX,
          (_, name) => {
            return params[name].toString();
          }
        );
      };
    } else {
      output[name] = strings[name as InternationalizedString];
    }
  }

  return output as unknown as InternationalizedStrings;
}

const i18nMessages = {
  en: compileTemplates(en)
};

export type SupportedLanguages = keyof typeof i18nMessages;

export default i18nMessages;
