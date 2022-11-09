import {atom} from 'jotai';

import type {
  View,
  CSVData,
  CSVRow,
  CSVArgsort,
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
// NOTE: row index always refer to an index in argsort
export const currentRowIndexAtom = atom<number | undefined>(undefined);
export const dataAtom = atom<Box<CSVData> | null>(null);
export const argsortAtom = atom<Box<CSVArgsort> | null>(null);
export const annotationConfigAtom = atom<Box<AnnotationConfig> | null>(null);
export const annotationStatsAtom = atom<Box<AnnotationStats> | null>(null);

// Derived atoms
export const currentRowAtom = atom<
  [index: number, row: CSVRow] | [index: undefined, row: null],
  number
>(
  get => {
    const index = get(currentRowIndexAtom);
    const dataBox = get(dataAtom);
    const argsortBox = get(argsortAtom);

    if (index === undefined || !dataBox || !argsortBox)
      return [undefined, null];

    const data = dataBox.get();
    const argsort = argsortBox.get();

    if (index > argsort.length)
      throw new Error('currentRowIndexAtom is out of bounds!');

    return [index, data.rows[argsort[index]]];
  },
  (get, set, index) => {
    set(currentRowIndexAtom, index);
  }
);
export const columnNamesInUseAtom = atom<Set<string>>(get => {
  const configBox = get(annotationConfigAtom);

  const names: Set<string> = new Set();
  if (!configBox) return names;

  configBox.get().schema.forEach(categorization => {
    names.add(categorization.name);
  });

  return names;
});
export const keysInUseAtom = atom<Set<string>>(get => {
  const configBox = get(annotationConfigAtom);

  const keys: Set<string> = new Set();

  if (!configBox) return keys;

  const {options, schema} = configBox.get();

  const navKeyBindings = options.navKeyBindings;

  keys.add(navKeyBindings.prev);
  keys.add(navKeyBindings.next);

  schema.forEach(categorization => {
    categorization.modalities.forEach(modality => {
      keys.add(modality.key);
    });
  });

  return keys;
});
