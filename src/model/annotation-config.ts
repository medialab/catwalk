import {v4 as uuid} from 'uuid';

import type {
  CSVColumns,
  CSVRows,
  MediaPreviewType,
  AnnotationConfig,
  AnnotationStats,
  Categorization,
  Modality,
  CategorizationStats,
  ModalityStats
} from '../types';

import {mapEntries} from '../lib/utils';
import {
  DEFAULT_CATEGORIZATION_NAME,
  DEFAULT_ANNOTATION_SORT_ORDER,
  DEFAULT_CATEGORIZATION_COLOR
} from '../defaults';

export type CreateDefaultAnnotationConfigParams = {
  columns: CSVColumns;
  selectedColumn: string;
  previewType: MediaPreviewType;
};

export function createModality(
  key: string,
  name: string,
  id?: string
): Modality {
  return {
    id: id ? id : uuid(),
    name,
    key
  };
}

export function createCategorization(
  name: string,
  color: string,
  id?: string,
  modalities?: Array<Modality>
): Categorization {
  return {
    name,
    id: id ? id : uuid(),
    color,
    modalities: modalities ? modalities : []
  };
}

export function createCategorizationWithDefaultModalities(
  name: string,
  color: string,
  keys: [string, string]
): Categorization {
  return {
    name,
    id: uuid(),
    color,
    modalities: [
      createModality(keys[0], 'Modality 1'),
      createModality(keys[1], 'Modality 2')
    ]
  };
}

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
      sortOrder: DEFAULT_ANNOTATION_SORT_ORDER,
      navKeyBindings: {
        prev: 'ArrowUp',
        next: 'ArrowDown'
      }
    },
    schema: [
      {
        name: findUnusedDefaultCategorizationName(columns),
        id: uuid(),
        color: DEFAULT_CATEGORIZATION_COLOR,
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

export function inferAnnotationStatsFromConfigAndRows(
  config: AnnotationConfig,
  rows: CSVRows
): AnnotationStats {
  const stats = initializeAnnotationStatsFromConfig(config);

  const counter = stats.counter;

  rows.forEach(row => {
    config.schema.forEach(categorization => {
      const categorizationStats = counter[categorization.name];

      const value = row[categorization.name];

      if (value !== undefined) {
        categorizationStats.count++;
        categorizationStats.modalities[value].count++;
      }
    });
  });

  return stats;
}
