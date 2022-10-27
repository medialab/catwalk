import {useAtom} from 'jotai';

import type {
  AnnotationConfig,
  AnnotationStats,
  CategorizationStats,
  Categorization,
  Modality,
  ModalityStats
} from '../types';
import {mapEntries} from '../lib/utils';
import {dataAtom, annotationConfigAtom, annotationStatsAtom} from '../atoms';
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
  AnnotationStats | null,
  AnnotationConfigActions
] {
  const [annotationConfig, setAnnotationConfig] = useAtom(annotationConfigAtom);
  const [annotationStats, setAnnotationStats] = useAtom(annotationStatsAtom);

  const actions: AnnotationConfigActions = {
    createAnnotationConfig(params) {
      const config = createDefaultAnnotationConfig(params);

      const stats: AnnotationStats = {
        counter: mapEntries<Categorization, CategorizationStats>(
          config.schema,
          categorization => {
            return [
              categorization.name,
              {
                count: 0,
                modalities: mapEntries<Modality, ModalityStats>(
                  categorization.modalities,
                  modality => {
                    return [
                      modality.name,
                      {
                        count: 0
                      }
                    ];
                  }
                )
              }
            ];
          }
        )
      };

      setAnnotationConfig(config);
      setAnnotationStats(stats);
    }
  };

  return [annotationConfig, annotationStats, actions];
}
