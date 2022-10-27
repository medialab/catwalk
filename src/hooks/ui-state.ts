import {useAtom} from 'jotai';

import {viewAtom} from '../atoms';

export function useView() {
  return useAtom(viewAtom);
}
