import Papa from 'papaparse';
import extend from '@yomguithereal/helpers/extend';

import type {CSVRows, CSVRow, CSVColumns} from '../types';

export type ParseCSVResult = {
  columns: CSVColumns;
  rows: CSVRows;
};

export type ParseCSVProgress = {
  percent: number;
  lines: number;
};

export function parseCsvFile(
  file: File,
  progressCallback?: (progress: ParseCSVProgress) => void
): Promise<ParseCSVResult> {
  const totalFileSize = file.size;
  const rows: CSVRows = [];
  let columns: CSVColumns | null = null;
  let parsedLines = 0;

  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      worker: true,
      header: true,
      skipEmptyLines: true,
      chunk(result) {
        extend(rows, result.data);
        parsedLines += result.data.length;

        columns = result.meta.fields;

        if (progressCallback) {
          const parsedSize = result.meta.cursor;
          progressCallback({
            percent: parsedSize / totalFileSize,
            lines: parsedLines
          });
        }
      },
      error(err) {
        reject(err);
      },
      complete() {
        progressCallback({percent: 1, lines: rows.length});
        resolve({rows, columns});
      }
    });
  });
}
