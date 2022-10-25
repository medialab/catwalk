import Papa from 'papaparse';

import type {CSVData, CSVRow, CSVColumns} from '../types';

export type ParseCSVResult = {
  columns: CSVColumns;
  data: CSVData;
};

export function parseCsvFile(file: File): Promise<ParseCSVResult> {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      worker: true,
      header: true,
      error(err) {
        reject(err);
      },
      complete(result) {
        resolve({data: result.data, columns: result.meta.fields});
      }
    });
  });
}
