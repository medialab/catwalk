import {useSetAtom, useAtomValue} from 'jotai';

import type {
  AnnotationConfig,
  AnnotationStats,
  MediaPreviewType,
  CSVData,
  Modality,
  Categorization
} from '../types';
import {
  dataAtom,
  annotationConfigAtom,
  annotationStatsAtom,
  currentRowAtom,
  columnNamesInUseAtom,
  keysInUseAtom
} from '../atoms';
import {
  CreateDefaultAnnotationConfigParams,
  createDefaultAnnotationConfig,
  initializeAnnotationStatsFromConfig,
  mutateToSetTag
} from '../model';
import {useBoxedAtom, useSetBoxedAtom} from './utils';

export function useCSVData(): CSVData | null {
  const [data] = useBoxedAtom(dataAtom);
  return data;
}

export function useSetCSVData() {
  return useSetBoxedAtom(dataAtom);
}

export function useColumnNamesInUse() {
  return useAtomValue(columnNamesInUseAtom);
}

export function useKeysInUse() {
  return useAtomValue(keysInUseAtom);
}

export function useCreateAnnotationConfig(): (
  params: CreateDefaultAnnotationConfigParams
) => void {
  const setAnnotationConfig = useSetBoxedAtom(annotationConfigAtom);
  const setAnnotationStats = useSetBoxedAtom(annotationStatsAtom);
  const setCurrentRowIndex = useSetAtom(currentRowAtom);

  return params => {
    const config = createDefaultAnnotationConfig(params);
    const stats = initializeAnnotationStatsFromConfig(config);

    setAnnotationConfig(config);
    setAnnotationStats(stats);
    setCurrentRowIndex(0);
  };
}

interface AnnotationConfigActions {
  selectColumn(column: string): void;
  setPreviewType(type: MediaPreviewType): void;
  setTag(categorization: Categorization, modality: Modality): void;
}

export function useAnnotationConfig(): [
  AnnotationConfig | null,
  AnnotationStats | null,
  AnnotationConfigActions
] {
  const [annotationConfig, refreshAnnotationConfig] =
    useBoxedAtom(annotationConfigAtom);
  const [annotationStats, refreshAnnotationStats] =
    useBoxedAtom(annotationStatsAtom);
  const [currentRowIndex, currentRow] = useAtomValue(currentRowAtom);
  const [data, refreshData] = useBoxedAtom(dataAtom);

  if (
    !annotationConfig ||
    !annotationStats ||
    !currentRow ||
    !data ||
    currentRowIndex === undefined
  )
    throw new Error(
      'useAnnotationConfig: it should not be possible to use this hook without data being loaded!'
    );

  const actions: AnnotationConfigActions = {
    selectColumn(column) {
      annotationConfig.selectedColumn = column;
      refreshAnnotationConfig();
    },
    setPreviewType(type) {
      annotationConfig.previewType = type;
      refreshAnnotationConfig();
    },
    setTag(categorization, modality) {
      mutateToSetTag(
        currentRow,
        annotationStats.counter,
        categorization,
        modality
      );
      refreshData();
      refreshAnnotationStats();
    }
  };

  return [annotationConfig, annotationStats, actions];
}
