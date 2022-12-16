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
import {suggestKey} from '../lib/keys';
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
  alreadyUsedKeys: Set<string>,
  name?: string
): Modality {
  return {
    id: uuid(),
    name: name || '',
    key: suggestKey(alreadyUsedKeys)
  };
}

export function createCategorizationWithDefaultModalities(
  alreadyUsedKeys: Set<string>,
  name: string,
  color: string
): Categorization {
  return {
    name,
    id: uuid(),
    color,
    modalities: [
      createModality(alreadyUsedKeys, 'Modality 1'),
      createModality(alreadyUsedKeys, 'Modality 2')
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
