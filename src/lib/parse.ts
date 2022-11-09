import Papa from 'papaparse';
import extend from '@yomguithereal/helpers/extend';

import type {CSVRows, CSVRow, CSVColumns, CSVData} from '../types';

export interface ParseCSVProgress {
  percent: number;
  lines: number;
}

export interface ParseCSVChunk {
  offset: number;
  rows: CSVRows;
}

export interface ParseCSVOptions {
  onProgress?: (progress: ParseCSVProgress) => void;
  onChunk?: (chunk: ParseCSVChunk) => Promise<void>;
}

export function parseCsvFile(
  file: File,
  options: ParseCSVOptions = {}
): Promise<CSVData> {
  const totalFileSize = file.size;
  const rows: CSVRows = [];
  let columns: CSVColumns | null = null;
  let parsedLines = 0;
  let offset = 0;

  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      async chunk(result, parser) {
        parser.pause();

        extend(rows, result.data);
        parsedLines += result.data.length;

        if (result.meta.fields) columns = result.meta.fields;

        const parsedSize = result.meta.cursor;
        options.onProgress?.({
          percent: parsedSize / totalFileSize,
          lines: parsedLines
        });

        if (options.onChunk) {
          await options.onChunk({offset, rows: result.data});
        }

        offset += result.data.length;

        parser.resume();
      },
      error(err) {
        reject(err);
      },
      complete() {
        options.onProgress?.({percent: 1, lines: rows.length});

        // TODO: what to do when file as no headers
        resolve({rows, columns: columns as CSVColumns});
      }
    });
  });
}
