import {useAtom, useSetAtom, useAtomValue} from 'jotai';

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
import {
  useNullableBoxedAtom,
  useSetNullableBoxedAtom,
  useNullableBoxedAtomValue
} from './utils';

export function useCSVData(): CSVData | null {
  const [data] = useNullableBoxedAtom(dataAtom);
  return data;
}

export function useSetCSVData() {
  return useSetNullableBoxedAtom(dataAtom);
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
  const setAnnotationConfig = useSetNullableBoxedAtom(annotationConfigAtom);
  const setAnnotationStats = useSetNullableBoxedAtom(annotationStatsAtom);
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
  const [annotationConfig, setAnnotationConfig] =
    useNullableBoxedAtom(annotationConfigAtom);
  const annotationStats = useNullableBoxedAtomValue(annotationStatsAtom);
  const [currentRowIndex, currentRow] = useAtomValue(currentRowAtom);
  const [data, setData] = useNullableBoxedAtom(dataAtom);

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
      setAnnotationConfig({...annotationConfig, selectedColumn: column});
    },
    setPreviewType(type) {
      setAnnotationConfig({...annotationConfig, previewType: type});
    },
    setTag(categorization, modality) {
      mutateToSetTag(
        currentRow,
        annotationStats.counter,
        categorization,
        modality
      );
      setData(data);
    }
  };

  return [annotationConfig, annotationStats, actions];
}
