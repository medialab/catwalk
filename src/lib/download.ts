import Papa from 'papaparse';
import saveAs from 'file-saver';
import YAML from 'yaml';

export function downloadFile(
  content: BlobPart,
  fileName: string,
  extension: string
) {
  const file = new Blob([content], {type: 'text/plain;charset=utf-8'});
  const d = new Date();
  const isoDate = d.toISOString().split('.')[0];
  saveAs(file, 'catwalk_' + fileName + '_' + isoDate + '.' + extension, {
    autoBom: false
  });
}

export function stringifyData(csvData) {
  return Papa.unparse(csvData?.rows);
}

export function stringifyModel(config) {
  return YAML.stringify(config);
}
