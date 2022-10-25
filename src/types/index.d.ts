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
  options: AnnotationOptions;
  schema: AnnotationSchema;
};
