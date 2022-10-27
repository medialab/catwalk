import {useAtom} from 'jotai';

import type {CSVRow} from '../types';
import {viewAtom, currentRowAtom} from '../atoms';

export function useView() {
  return useAtom(viewAtom);
}

export function useCurrentRowEntry() {
  return useAtom(currentRowAtom);
}

export function useCurrentRowIndex(): [number, (update: number) => void] {
  const [[currentRowIndex], setCurrentRowIndex] = useAtom(currentRowAtom);

  return [currentRowIndex, setCurrentRowIndex];
}

export function useCurrentRow(): [CSVRow, (update: number) => void] {
  const [[, currentRow], setCurrentRowIndex] = useAtom(currentRowAtom);

  return [currentRow, setCurrentRowIndex];
}
