import {useAtom} from 'jotai';

import type {CSVRow} from '../types';
import {viewAtom, currentRowAtom, currentRowIndexAtom} from '../atoms';

export function useView() {
  return useAtom(viewAtom);
}

export function useCurrentRowEntry() {
  return useAtom(currentRowAtom);
}

export function useCurrentRowIndex() {
  return useAtom(currentRowIndexAtom);
}

export function useCurrentRow(): [CSVRow | null, (update: number) => void] {
  const [[, currentRow], setCurrentRowIndex] = useAtom(currentRowAtom);

  return [currentRow, setCurrentRowIndex];
}
