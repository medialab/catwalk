/**
 * UI state types.
 */
export type View = 'landing' | 'data-preview' | 'annotation';
export type LayoutMode = 'landing' | 'annotation';
export type NotificationType = 'error' | 'info';
export type DownloadType = 'everything' | 'data' | 'model';
export type ModalName = 'download' | 'railway-nav-key-edit';

/**
 * Key binding types.
 */
export type NavDirection = 'prev' | 'next';
export type NavKeyBindings = Record<NavDirection, string>;

/**
 * CSV data types.
 */
export type CSVRow = {[column: string]: string};
export type CSVColumns = Array<string>;
export type CSVRows = Array<CSVRow>;
export type CSVArgsort = Array<number>;
export type CSVData = {columns: CSVColumns; rows: CSVRows};

/**
 * Types related to the annotation schema.
 */
export type Modality = {
  id: string;
  name: string;
  key: string;
};

export type Modalities = Array<Modality>;

export type Categorization = {
  id: string;
  name: string;
  color: string;
  modalities: Modalities;
};

export type AnnotationSchema = Array<Categorization>;

export type AnnotationSortOrder = 'table' | 'non-annotated' | 'incomplete';

export type AnnotationOptions = {
  sortOrder: AnnotationSortOrder;
  navKeyBindings: NavKeyBindings;
};

export type AnnotationConfig = {
  selectedColumn: string;
  previewType: MediaPreviewType;
  options: AnnotationOptions;
  schema: AnnotationSchema;
};

/**
 * Types related to the annotation stats.
 */
export type ModalityStats = {count: number};
export type ModalitiesStats = Record<string, ModalityStats>;
export type CategorizationStats = {
  count: number;
  modalities: ModalitiesStats;
};
export type AnnotationCounter = Record<string, CategorizationStats>;
export type AnnotationStats = {counter: AnnotationCounter};

/**
 * Media preview types.
 */
export type MediaPreviewType =
  | 'debug'
  | 'twitter-tweet'
  | 'youtube-video'
  | 'website-iframe'
  | 'image';
