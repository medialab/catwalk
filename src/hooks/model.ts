import {useAtom, useSetAtom} from 'jotai';

import Box from '../lib/box';
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

function assertDataExists(
  data: Box<CSVData> | null
): asserts data is Box<CSVData> {
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
  const [annotationStats, setAnnotationStats] = useAtom(annotationStatsAtom);
  const setCurrentRowIndex = useSetAtom(currentRowIndexAtom);
  // const [dataBox, setData] = useAtom(dataAtom);

  const actions: AnnotationConfigActions = {
    createAnnotationConfig(params) {
      const config = createDefaultAnnotationConfig(params);
      const stats = initializeAnnotationStatsFromConfig(config);

      setAnnotationConfig(config);
      setAnnotationStats(Box.of(stats));
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

  return [
    annotationConfig,
    annotationStats ? annotationStats.get() : null,
    actions
  ];
}
