import {indices as indicesFromLength} from 'mnemonist/utils/typed-arrays';

import type {
  CSVRows,
  CSVArgsort,
  AnnotationSortOrder,
  AnnotationSchema
} from '../types';

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
    argsort.sort((a, b) => {
      const firstRow = rows[a];
      const secondRow = rows[b];

      let firstScore = 0;
      let secondScore = 0;

      schema.forEach(categorization => {
        if (firstRow[categorization.name] !== undefined) firstScore++;
        if (secondRow[categorization.name] !== undefined) secondScore++;
      });

      if (firstScore < secondScore) return -1;
      else if (firstScore > secondScore) return 1;
      else if (a < b) return -1;
      else if (a > b) return 1;

      throw new Error('the `incomplete` comparator should be stable!');
    });
  }
}

export function indices(rows: CSVRows): CSVArgsort {
  return indicesFromLength(rows.length);
}
