import {atom} from 'jotai';

import type {CSVData, AnnotationConfig} from './types';
import {SupportedLanguages} from '../i18n';

export const langAtom = atom<SupportedLanguages>('en');
export const dataAtom = atom<CSVData | null>(null);
export const annotationConfigAtom = atom<AnnotationConfig | null>(null);
