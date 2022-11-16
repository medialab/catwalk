import Papa from 'papaparse';
import saveAs from 'file-saver';
import YAML from 'yaml';

export function downloadFile(content, downloadType: string) {
  let stringContent = '';
  let extension = 'yml';

  if (downloadType === 'data') {
    stringContent = Papa.unparse(content);
    extension = 'csv';
  } else {
    stringContent = YAML.stringify(content);
  }

  const file = new Blob([stringContent], {type: 'text/plain;charset=utf-8'});
  const d = new Date();
  const isoDate = d.toISOString().split('.')[0];
  const fileName = `catwalk_${downloadType}_${isoDate}.${extension}`;
  saveAs(file, fileName, {
    autoBom: false
  });
}
