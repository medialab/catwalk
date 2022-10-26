import {v4 as uuid} from 'uuid';

import type {MediaPreviewType, AnnotationConfig, CSVColumns} from './types';

export const DEFAULT_MEDIA_PREVIEW_TYPE: MediaPreviewType = 'twitter-tweet';

type CreateDefaultAnnotationConfigParams = {
  columns: CSVColumns;
  selectedColumn: string;
  previewType: MediaPreviewType;
};

export function createDefaultAnnotationConfig({
  columns,
  selectedColumn,
  previewType
}: CreateDefaultAnnotationConfigParams): AnnotationConfig {
  // Finding a name for the default category
  let defaultCategoryName = 'Status';

  const columnSet = new Set(columns);

  let i = 1;

  while (columnSet.has(defaultCategoryName)) {
    defaultCategoryName = `Status (${++i})`;
  }

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
        name: defaultCategoryName,
        id: uuid(),
        color: 'cyan',
        modalities: [
          {id: uuid(), name: 'IN', key: 'a'},
          {id: uuid(), name: 'OUT', key: 'z'},
          {id: uuid(), name: 'UNDECIDED', key: 'e'}
        ]
      }
    ]
  };
}
