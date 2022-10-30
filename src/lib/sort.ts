import type {
  CSVRows,
  CSVArgsort,
  AnnotationSortOrder,
  AnnotationSchema
} from '../types';

// function compareRowsForIncompleteness() {}

export default function sort(
  schema: AnnotationSchema,
  order: AnnotationSortOrder,
  rows: CSVRows,
  argsort: CSVArgsort
): void {
  if (rows.length !== argsort.length)
    throw new Error('sort: rows and argsort should have the same length!');

  // We always reset argsort to indices range to make subsequent ordering
  // types stable.
  for (let i = 0, l = rows.length; i < l; i++) {
    argsort[i] = i;
  }

  if (order === 'incomplete') {
    argsort.sort(function (a, b) {
      const firstRow = rows[a];
      const secondRow = rows[b];

      return 0;
    });
  }
}

export function range(rows: CSVRows): CSVArgsort {
  const argsort = new Array(rows.length);

  for (let i = 0, l = rows.length; i < l; i++) argsort[i] = i;

  return argsort;
}
