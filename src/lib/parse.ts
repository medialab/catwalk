import Papa from 'papaparse';
import extend from '@yomguithereal/helpers/extend';

import type {CSVData, CSVRow, CSVColumns} from '../types';

export type ParseCSVResult = {
  columns: CSVColumns;
  data: CSVData;
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
  const data: CSVData = [];
  let columns: CSVColumns | null = null;
  let parsedLines = 0;

  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      worker: true,
      header: true,
      chunk(result) {
        extend(data, result.data);
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
        progressCallback({percent: 1, lines: data.length});
        resolve({data, columns});
      }
    });
  });
}
