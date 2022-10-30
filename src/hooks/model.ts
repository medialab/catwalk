import {useSetAtom, useAtomValue} from 'jotai';

import type {
  AnnotationConfig,
  AnnotationStats,
  MediaPreviewType,
  AnnotationSortOrder,
  CSVData,
  Modality,
  Categorization
} from '../types';
import {
  dataAtom,
  argsortAtom,
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
import sort, {indices} from '../lib/sort';
import {useBoxedAtom, useSetBoxedAtom, useBoxedAtomValue} from './utils';

export function useCSVData(): CSVData | null {
  const [data] = useBoxedAtom(dataAtom);
  return data;
}

export function useSetCSVData() {
  const setCsvData = useSetBoxedAtom(dataAtom);
  const setArgsort = useSetBoxedAtom(argsortAtom);

  return (data: CSVData) => {
    setCsvData(data);
    setArgsort(indices(data.rows));
  };
}

export function useArgsort() {
  return useBoxedAtomValue(argsortAtom);
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
  setSortOrder(order: AnnotationSortOrder): void;
}

export function useAnnotationConfig(): [
  AnnotationConfig | null,
  AnnotationStats | null,
  AnnotationConfigActions
] {
  const [annotationConfig, refreshAnnotationConfig] =
    useBoxedAtom(annotationConfigAtom);
  const [argsort, refreshArgsort] = useBoxedAtom(argsortAtom);
  const [annotationStats, refreshAnnotationStats] =
    useBoxedAtom(annotationStatsAtom);
  const [currentRowIndex, currentRow] = useAtomValue(currentRowAtom);
  const [data, refreshData] = useBoxedAtom(dataAtom);

  if (
    !annotationConfig ||
    !annotationStats ||
    !argsort ||
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
    },
    setSortOrder(order) {
      annotationConfig.options.sortOrder = order;
      sort(annotationConfig.schema, order, data.rows, argsort);
      refreshAnnotationConfig();
      refreshArgsort();
    }
  };

  return [annotationConfig, annotationStats, actions];
}
