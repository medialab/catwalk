import {v4 as uuid} from 'uuid';

import type {
  CSVColumns,
  MediaPreviewType,
  AnnotationConfig,
  AnnotationStats,
  Categorization,
  Modality,
  CategorizationStats,
  ModalityStats
} from '../types';
import {mapEntries} from '../lib/utils';
import {DEFAULT_CATEGORIZATION_NAME} from '../defaults';

export type CreateDefaultAnnotationConfigParams = {
  columns: CSVColumns;
  selectedColumn: string;
  previewType: MediaPreviewType;
};

function findUnusedDefaultCategorizationName(columns: CSVColumns): string {
  let defaultCategoryName = DEFAULT_CATEGORIZATION_NAME;

  const columnSet = new Set(columns);

  let i = 1;

  while (columnSet.has(defaultCategoryName)) {
    defaultCategoryName = `Status (${++i})`;
  }

  return defaultCategoryName;
}

export function createDefaultAnnotationConfig({
  columns,
  selectedColumn,
  previewType
}: CreateDefaultAnnotationConfigParams): AnnotationConfig {
  return {
    selectedColumn,
    previewType,
    options: {
      sortOrder: 'table',
      navKeyBindings: {
        prev: 'ArrowUp',
        next: 'ArrowDown'
      }
    },
    schema: [
      {
        name: findUnusedDefaultCategorizationName(columns),
        id: uuid(),
        color: 'cyan',
        modalities: [
          {id: uuid(), name: 'IN', key: 'A'},
          {id: uuid(), name: 'OUT', key: 'Z'},
          {id: uuid(), name: 'UNDECIDED', key: 'E'}
        ]
      }
    ]
  };
}

export function initializeAnnotationStatsFromConfig(
  config: AnnotationConfig
): AnnotationStats {
  return {
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
}
