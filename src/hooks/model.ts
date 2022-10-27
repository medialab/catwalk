import {useAtom} from 'jotai';

import type {AnnotationConfig, AnnotationStats} from '../types';
import {dataAtom, annotationConfigAtom, annotationStatsAtom} from '../atoms';
import {
  CreateDefaultAnnotationConfigParams,
  createDefaultAnnotationConfig,
  initializeAnnotationStatsFromConfig
} from '../model';

export function useCSVData() {
  return useAtom(dataAtom);
}

interface AnnotationConfigActions {
  createAnnotationConfig(params: CreateDefaultAnnotationConfigParams): void;
}

export function useAnnotationConfig(): [
  AnnotationConfig | null,
  AnnotationStats | null,
  AnnotationConfigActions
] {
  const [annotationConfig, setAnnotationConfig] = useAtom(annotationConfigAtom);
  const [annotationStats, setAnnotationStats] = useAtom(annotationStatsAtom);

  const actions: AnnotationConfigActions = {
    createAnnotationConfig(params) {
      const config = createDefaultAnnotationConfig(params);
      const stats = initializeAnnotationStatsFromConfig(config);

      setAnnotationConfig(config);
      setAnnotationStats(stats);
    }
  };

  return [annotationConfig, annotationStats, actions];
}
