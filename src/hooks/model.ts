import {useAtom, useSetAtom} from 'jotai';

import type {
  AnnotationConfig,
  AnnotationStats,
  MediaPreviewType,
  CSVData
  // Modality,
  // Categorization
} from '../types';
import {
  dataAtom,
  annotationConfigAtom,
  annotationStatsAtom,
  currentRowIndexAtom
} from '../atoms';
import {
  CreateDefaultAnnotationConfigParams,
  createDefaultAnnotationConfig,
  initializeAnnotationStatsFromConfig
  // setTag
} from '../model';
import {useNullableBoxedAtom, useSetNullableBoxedAtom} from './utils';

export function useCSVData(): CSVData | null {
  const [data] = useNullableBoxedAtom(dataAtom);
  return data;
}

export function useSetCSVData() {
  return useSetNullableBoxedAtom(dataAtom);
}

interface AnnotationConfigActions {
  createAnnotationConfig(params: CreateDefaultAnnotationConfigParams): void;
  selectColumn(column: string): void;
  setPreviewType(type: MediaPreviewType): void;
  // setTag(categorization: Categorization, modality: Modality): void;
}

function assertConfigExists(
  config: AnnotationConfig | null
): asserts config is AnnotationConfig {
  if (!config)
    throw new Error(
      `${arguments.callee.name} cannot be used before annotation config is set!'`
    );
}

function assertDataExists(data: CSVData | null): asserts data is CSVData {
  if (!data)
    throw new Error(
      `${arguments.callee.name} cannot be used before data is loaded!'`
    );
}

export function useAnnotationConfig(): [
  AnnotationConfig | null,
  AnnotationStats | null,
  AnnotationConfigActions
] {
  const [annotationConfig, setAnnotationConfig] = useAtom(annotationConfigAtom);
  const [annotationStats, setAnnotationStats] =
    useNullableBoxedAtom(annotationStatsAtom);
  const setCurrentRowIndex = useSetAtom(currentRowIndexAtom);
  // const [dataBox, setData] = useAtom(dataAtom);

  const actions: AnnotationConfigActions = {
    createAnnotationConfig(params) {
      const config = createDefaultAnnotationConfig(params);
      const stats = initializeAnnotationStatsFromConfig(config);

      setAnnotationConfig(config);
      setAnnotationStats(stats);
      setCurrentRowIndex(0);
    },
    selectColumn(column) {
      assertConfigExists(annotationConfig);
      setAnnotationConfig({...annotationConfig, selectedColumn: column});
    },
    setPreviewType(type) {
      assertConfigExists(annotationConfig);
      setAnnotationConfig({...annotationConfig, previewType: type});
    }
    // setTag(categorization, modality) {
    //   assertDataExists(dataBox);

    //   const newData = dataBox.mutate(data => {});
    // }
  };

  return [annotationConfig, annotationStats, actions];
}
