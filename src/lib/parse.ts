import Papa from 'papaparse';

import type {CSVData, CSVRow} from '../types';

export function parseCsvFile(file: File): Promise<CSVData> {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      worker: true,
      header: true,
      error(err) {
        reject(err);
      },
      complete(result) {
        resolve(result.data);
      }
    });
  });
}
