import {atom} from 'jotai';

import type {
  View,
  CSVData,
  AnnotationConfig,
  ModalName,
  AnnotationStats
} from './types';
import {DEFAULT_VIEW} from './defaults';
import {SupportedLanguages} from '../i18n';

export const langAtom = atom<SupportedLanguages>('en');
export const viewAtom = atom<View>(DEFAULT_VIEW);
export const dataAtom = atom<CSVData | null>(null);
export const annotationConfigAtom = atom<AnnotationConfig | null>(null);
export const modalAtom = atom<ModalName | null>(null);
export const annotationStatsAtom = atom<AnnotationStats | null>(null);
