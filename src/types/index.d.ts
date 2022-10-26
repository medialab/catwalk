/**
 * UI state types.
 */
export type View = 'landing' | 'data-preview' | 'annotation';
export type LayoutMode = 'landing' | 'annotation';
export type NotificationType = 'error' | 'info';

/**
 * CSV data types.
 */
export type CSVRow = {[column: string]: string};
export type CSVColumns = Array<string>;
export type CSVRows = Array<CSVRow>;
export type CSVData = {columns: CSVColumns; rows: CSVRows};

/**
 * Types related to the annotation schema.
 */
export type Modality = {
  id: string;
  name: string;
  key: string;
};

export type Categorization = {
  id: string;
  name: string;
  color: string;
  modalities: Array<Modality>;
};

export type AnnotationSchema = Array<Categorization>;

export type AnnotationSortOrder = 'table' | 'non-annotated' | 'incomplete';

export type AnnotationOptions = {
  sortOrder: AnnotationSortOrder;
  navKeyBindings: {
    prev: string;
    next: string;
  };
};

export type AnnotationConfig = {
  selectedColumn: string;
  previewType: MediaPreviewType;
  options: AnnotationOptions;
  schema: AnnotationSchema;
};

/**
 * Media preview types.
 */
export type MediaPreviewType = 'twitter-tweet';
