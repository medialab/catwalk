import {useAtom} from 'jotai';

import type {AnnotationConfig} from '../types';
import {dataAtom, annotationConfigAtom} from '../atoms';
import {
  CreateDefaultAnnotationConfigParams,
  createDefaultAnnotationConfig
} from '../defaults';

export function useCSVData() {
  return useAtom(dataAtom);
}

interface AnnotationConfigActions {
  createAnnotationConfig(params: CreateDefaultAnnotationConfigParams): void;
}

export function useAnnotationConfig(): [
  AnnotationConfig | null,
  AnnotationConfigActions
] {
  const [annotationConfig, setAnnotationConfig] = useAtom(annotationConfigAtom);

  const actions: AnnotationConfigActions = {
    createAnnotationConfig(params) {
      const config = createDefaultAnnotationConfig(params);
      setAnnotationConfig(config);
    }
  };

  return [annotationConfig, actions];
}
