import {useAtom, useSetAtom} from 'jotai';

import {modalAtom} from '../atoms';

export function useModals() {
  return useAtom(modalAtom);
}

export function useDisplayModal() {
  return useSetAtom(modalAtom);
}
