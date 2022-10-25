import {useAtom, SetStateAction} from 'jotai';

import type {CSVData} from '../types';
import {dataAtom} from '../atoms';

export function useCSVData(): [CSVData | null, SetStateAction<CSVData | null>] {
  return useAtom(dataAtom);
}
