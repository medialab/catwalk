import {useAtom} from 'jotai';

import {dataAtom} from '../atoms';

export function useCSVData() {
  return useAtom(dataAtom);
}
