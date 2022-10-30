import type {CSVRow, CSVRows, AnnotationConfig} from './types';
import PersistentCache from './lib/cache';

interface CatwalkCacheStore {
  rows: CSVRow;
  config: AnnotationConfig;
}

interface CatwalkCacheStoreKeys {
  rows: number;
  config: 'current-config';
}

export class CatwalkCache extends PersistentCache<
  CatwalkCacheStore,
  CatwalkCacheStoreKeys
> {
  constructor() {
    super('catwalk-cache', ['rows', 'config']);
  }

  getConfig() {
    return this.get('config', 'current-config');
  }

  setConfig(config: AnnotationConfig): Promise<void> {
    return this.set('config', 'current-config', config);
  }

  getRows() {
    return this.getAll('rows');
  }

  addRows(offset: number, rows: CSVRows): Promise<void> {
    return this.transaction('rows', 'readwrite', t => {
      const objectStore = t.objectStore('rows');

      rows.forEach(row => {
        objectStore.add(row, offset++);
      });

      return Promise.resolve();
    });
  }
}

const cache = new CatwalkCache();

export default cache;
