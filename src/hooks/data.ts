import {useAtom, SetStateAction} from 'jotai';

import type {ParseCSVResult} from '../lib/parse';
import {dataAtom} from '../atoms';

export function useData(): [
  ParseCSVResult | null,
  (action: SetStateAction<ParseCSVResult | null>) => void
] {
  return useAtom(dataAtom);
}
