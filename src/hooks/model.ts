import {useAtom, SetStateAction} from 'jotai';

import type {CSVData, AnnotationConfig} from '../types';
import {dataAtom, annotationConfigAtom} from '../atoms';
import {
  CreateDefaultAnnotationConfigParams,
  createDefaultAnnotationConfig
} from '../defaults';

export function useCSVData(): [
  CSVData | null,
  (action: SetStateAction<CSVData | null>) => void
] {
  return useAtom(dataAtom);
}

interface AnnotationConfigActions {
  createAnnotationConfig(params: CreateDefaultAnnotationConfigParams): void;
}

export function useAnnotationConfig(): [
  AnnotationConfig,
  AnnotationConfigActions
] {
  const [annotationConfig, setAnnotationConfig] = useAtom(annotationConfigAtom);

  const actions: AnnotationConfigActions = {
    createAnnotationConfig(params) {
      const config = createDefaultAnnotationConfig(params);
      // setAnnotationConfig(config);
    }
  };

  return [annotationConfig, actions];
}
