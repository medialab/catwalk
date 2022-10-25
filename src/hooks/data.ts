import {useAtom, SetStateAction} from 'jotai';

import type {CSVData} from '../types';
import {dataAtom} from '../atoms';

export function useCSVData(): [
  CSVData | null,
  (action: SetStateAction<CSVData | null>) => void
] {
  return useAtom(dataAtom);
}
