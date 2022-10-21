import {atom} from 'jotai';

import {SupportedLanguages} from '../i18n';

export const langAtom = atom<SupportedLanguages>('en');
