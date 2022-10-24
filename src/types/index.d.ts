/**
 * CSV data types.
 */
export type CSVRow = {[column: string]: string};
export type CSVData = Array<CSVRow>;

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
