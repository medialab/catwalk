import {atom} from 'jotai';

import type {
  View,
  CSVData,
  CSVRow,
  AnnotationConfig,
  ModalName,
  AnnotationStats
} from './types';
import {DEFAULT_VIEW} from './defaults';
import {SupportedLanguages} from '../i18n';
import Box from './lib/box';

// UI state
export const langAtom = atom<SupportedLanguages>('en');
export const viewAtom = atom<View>(DEFAULT_VIEW);
export const modalAtom = atom<ModalName | null>(null);

// Data & Schema
export const currentRowIndexAtom = atom<number | null>(null);
export const currentRowAtom = atom<[index: number, row: CSVRow], number>(
  get => {
    const index = get(currentRowIndexAtom);
    const dataBox = get(dataAtom);

    if (!index || !dataBox)
      throw new Error(
        'should not be possible to read from currentRowAtom if data is not loaded!'
      );

    const data = dataBox.get();

    if (index > data.rows.length)
      throw new Error('currentRowIndexAtom is out of bounds!');

    return [index, data.rows[index]];
  },
  (get, set, index) => {
    set(currentRowIndexAtom, index);
  }
);
export const dataAtom = atom<Box<CSVData> | null>(null);
export const annotationConfigAtom = atom<AnnotationConfig | null>(null);
export const annotationStatsAtom = atom<Box<AnnotationStats> | null>(null);
