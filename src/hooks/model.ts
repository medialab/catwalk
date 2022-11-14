import {useSetAtom, useAtomValue, useAtom} from 'jotai';

import cache from '../cache';
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
  currentRowIndexAtom,
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
import {useSetView} from './ui-state';
import {useBoxedAtom, useSetBoxedAtom, useBoxedAtomValue} from './utils';

export function useCSVData(): CSVData | null {
  return useBoxedAtomValue(dataAtom);
}

export function useSetCSVData() {
  const setCsvData = useSetBoxedAtom(dataAtom);
  const setArgsort = useSetBoxedAtom(argsortAtom);

  return async (data: CSVData) => {
    await cache.seal({count: data.rows.length, columns: data.columns});
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
) => Promise<void> {
  const setAnnotationConfig = useSetBoxedAtom(annotationConfigAtom);
  const setAnnotationStats = useSetBoxedAtom(annotationStatsAtom);
  const setCurrentRowIndex = useSetAtom(currentRowAtom);

  return async params => {
    const config = createDefaultAnnotationConfig(params);
    const stats = initializeAnnotationStatsFromConfig(config);

    await cache.setConfig(config);

    setAnnotationConfig(config);
    setAnnotationStats(stats);
    setCurrentRowIndex(0);
  };
}

export function useAnnotationConfig() {
  return useBoxedAtomValue(annotationConfigAtom);
}

interface AnnotationConfigActions {
  selectColumn(column: string): Promise<void>;
  setPreviewType(type: MediaPreviewType): Promise<void>;
  setTag(categorization: Categorization, modality: Modality): Promise<void>;
  setSortOrder(order: AnnotationSortOrder): Promise<void>;
}

export function useAnnotationConfigActions(): [
  AnnotationConfig | null,
  AnnotationStats | null,
  AnnotationConfigActions
] {
  const [annotationConfig, refreshAnnotationConfig] =
    useBoxedAtom(annotationConfigAtom);
  const [argsort, refreshArgsort] = useBoxedAtom(argsortAtom);
  const [annotationStats, refreshAnnotationStats] =
    useBoxedAtom(annotationStatsAtom);
  const [[currentRowIndex, currentRow], setCurrentRowIndex] =
    useAtom(currentRowAtom);
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
      'useAnnotationConfigActions: it should not be possible to use this hook without data being loaded!'
    );

  const actions: AnnotationConfigActions = {
    async selectColumn(column) {
      annotationConfig.selectedColumn = column;
      await cache.setConfig(annotationConfig);
      refreshAnnotationConfig();
    },
    async setPreviewType(type) {
      annotationConfig.previewType = type;
      await cache.setConfig(annotationConfig);
      refreshAnnotationConfig();
    },
    async setTag(categorization, modality) {
      mutateToSetTag(
        currentRow,
        annotationStats.counter,
        categorization,
        modality
      );

      await cache.setRow(currentRowIndex, currentRow);

      refreshData();
      refreshAnnotationStats();
    },
    async setSortOrder(order) {
      const rowIndexInTableBeforeSort = argsort[currentRowIndex];

      annotationConfig.options.sortOrder = order;
      sort(annotationConfig.schema, order, data.rows, argsort);

      const rowIndexInNewArgsort = argsort.findIndex(
        (i: number) => i === rowIndexInTableBeforeSort
      );

      if (rowIndexInNewArgsort === undefined)
        throw new Error(
          'failed to find new index in argsort for current row. This should not happen theoretically!'
        );

      await cache.setConfig(annotationConfig);

      refreshAnnotationConfig();
      refreshArgsort();
      setCurrentRowIndex(rowIndexInNewArgsort);
    }
  };

  return [annotationConfig, annotationStats, actions];
}

export function useResetProject() {
  const setView = useSetView();
  const setCurrentRowIndex = useSetAtom(currentRowIndexAtom);
  const setData = useSetBoxedAtom(dataAtom);
  const setAnnotationConfig = useSetBoxedAtom(annotationConfigAtom);
  const setArgsort = useSetBoxedAtom(argsortAtom);
  const setAnnotationStats = useSetBoxedAtom(annotationStatsAtom);

  return async () => {
    await cache.delete();
    await cache.open();
    setData(null);
    setCurrentRowIndex(undefined);
    setAnnotationConfig(null);
    setArgsort(null);
    setAnnotationStats(null);
    setView('landing');
  };
}
