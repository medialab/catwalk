import {atom} from 'jotai';

import type {ParseCSVResult} from './lib/parse';
import {SupportedLanguages} from '../i18n';

export const langAtom = atom<SupportedLanguages>('en');
export const dataAtom = atom<ParseCSVResult | null>(null);
