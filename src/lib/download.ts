import Papa from 'papaparse';
import saveAs from 'file-saver';
import YAML from 'yaml';

import type {CSVData, AnnotationConfig} from '../types';

const MIME_TYPES = {
  yml: 'text/x-yaml',
  csv: 'text/csv'
} as const;

type Extension = keyof typeof MIME_TYPES;

function createBlob(data: string, extension: Extension) {
  const mime = MIME_TYPES[extension];

  return new Blob([data], {type: `${mime};charset=utf-8`});
}

function createFilename(name: string, extension: Extension): string {
  const isoDate = new Date().toISOString().split('.')[0].replace(':', '-');

  return `catwalk_${name}_${isoDate}.${extension}`;
}

function save(data: string, name: string, extension: Extension): void {
  const filename = createFilename(name, extension);
  const blob = createBlob(data, extension);

  saveAs(blob, filename, {autoBom: false});
}

export function downloadCsvRows(config: AnnotationConfig, csv: CSVData): void {
  const columns = csv.columns.concat(config.schema.map(({name}) => name));
  const data = Papa.unparse(csv.rows, {header: true, columns});
  save(data, 'data', 'csv');
}

export function downloadConfig(config: AnnotationConfig): void {
  const data = YAML.stringify(config);
  save(data, 'config', 'yml');
}
