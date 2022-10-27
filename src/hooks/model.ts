import {useAtom, useSetAtom} from 'jotai';

import Box from '../lib/box';
import type {
  AnnotationConfig,
  AnnotationStats,
  MediaPreviewType,
  CSVData
} from '../types';
import {dataAtom, annotationConfigAtom, annotationStatsAtom} from '../atoms';
import {
  CreateDefaultAnnotationConfigParams,
  createDefaultAnnotationConfig,
  initializeAnnotationStatsFromConfig
} from '../model';

export function useCSVData(): CSVData | null {
  const [dataBox] = useAtom(dataAtom);
  return dataBox ? dataBox.get() : null;
}

export function useSetCSVData() {
  const setCSVData = useSetAtom(dataAtom);

  return (data: CSVData) => {
    return setCSVData(Box.of(data));
  };
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
      setAnnotationStats(Box.of(stats));
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

  return [
    annotationConfig,
    annotationStats ? annotationStats.get() : null,
    actions
  ];
}
