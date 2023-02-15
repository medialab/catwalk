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
  ModalityStats,
  AnnotationSchema
} from '../types';

import {mapEntries} from '../lib/utils';
import {suggestKey} from '../lib/keys';
import {randomColor} from '../lib/colors';
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
          {id: uuid(), name: 'IN', key: 'ArrowLeft'},
          {id: uuid(), name: 'UNDECIDED', key: 'Shift'},
          {id: uuid(), name: 'OUT', key: 'ArrowRight'}
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

export function renameModality(
  schema: AnnotationSchema,
  categorization: Categorization,
  modality: Modality,
  name: string
): AnnotationSchema {
  return schema.map(c => {
    if (c.id === categorization.id) {
      return {
        ...c,
        modalities: c.modalities.map(m => {
          if (m.id === modality.id) {
            return {
              ...m,
              name
            };
          } else return m;
        })
      };
    } else return c;
  });
}

export function renameCategorization(
  schema: AnnotationSchema,
  categorization: Categorization,
  name: string
): AnnotationSchema {
  return schema.map(c => {
    if (c.id === categorization.id) {
      return {
        ...c,
        name
      };
    } else return c;
  });
}

export function addDefaultCategorization(
  schema: AnnotationSchema,
  alreadyUsedKeys?: Set<string>
): AnnotationSchema {
  return schema.concat(
    createCategorization('', randomColor(), undefined, [
      createModality(suggestKey(alreadyUsedKeys), 'Modality 1'),
      createModality(suggestKey(alreadyUsedKeys), 'Modality 2')
    ])
  );
}

export function addDefaultModality(
  schema: AnnotationSchema,
  categorization: Categorization,
  alreadyUsedKeys?: Set<string>
): AnnotationSchema {
  return schema.map(c => {
    if (c.id === categorization.id) {
      return {
        ...c,
        modalities: c.modalities.concat(
          createModality(suggestKey(alreadyUsedKeys), '')
        )
      };
    } else return c;
  });
}

export function dropCategorization(
  schema: AnnotationSchema,
  categorization: Categorization
): AnnotationSchema {
  return schema.filter(c => c.id !== categorization.id);
}

export function dropModality(
  schema: AnnotationSchema,
  categorization: Categorization,
  modality: Modality
): AnnotationSchema {
  return schema.map(c => {
    if (c.id === categorization.id) {
      return {...c, modalities: c.modalities.filter(m => m.id !== modality.id)};
    } else return c;
  });
}
