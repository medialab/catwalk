import {useAtom} from 'jotai';

import type {
  AnnotationConfig,
  AnnotationStats,
  MediaPreviewType
} from '../types';
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
  selectColumn(column: string): void;
  setPreviewType(type: MediaPreviewType): void;
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
    },
    selectColumn(column) {
      if (!annotationConfig)
        throw new Error(
          'selectColumn cannot be used before annotation config is set!'
        );

      setAnnotationConfig({...annotationConfig, selectedColumn: column});
    },
    setPreviewType(type) {
      if (!annotationConfig)
        throw new Error(
          'setPreviewType cannot be used before annotation config is set!'
        );

      setAnnotationConfig({...annotationConfig, previewType: type});
    }
  };

  return [annotationConfig, annotationStats, actions];
}
