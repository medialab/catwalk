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

export type SortOrder = 'table-order';

export type AnnotationOptions = {
  sortOrder: SortOrder;
  navKeyBindings: {
    prev: string;
    next: string;
  };
};

export type AnnotationConfig = {
  options: AnnotationOptions;
  schema: Array<Categorization>;
};
