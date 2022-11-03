import type {CSVRow, CSVRows, CSVColumns, AnnotationConfig} from './types';
import PersistentCache from './lib/cache';
import {validateAnnotationConfig} from './validation';

// NOTE: the cache contains a counter of number of items expected
// in the rows store, to avoid issues where page was reloaded when inserting
// rows in the cache and avoid data loss.
// NOTE: the cache also contains a version, so we can gracefully upgrade
// or invalidate if required.
interface CatwalkCacheConsistencyInfo {
  count: number;
  version: string;
  columns: CSVColumns;
}

interface CatwalkCacheStore {
  rows: CSVRow;
  config: AnnotationConfig;
  consistency: CatwalkCacheConsistencyInfo;
}

interface CatwalkCacheStoreKeys {
  rows: number;
  config: 'config';
  consistency: 'consistency';
}

export class CatwalkCache extends PersistentCache<
  CatwalkCacheStore,
  CatwalkCacheStoreKeys
> {
  static VERSION = '1.0.0';

  constructor() {
    super('catwalk-cache', ['rows', 'config', 'consistency']);
  }

  getConsistencyInfo() {
    return this.get('consistency', 'consistency');
  }

  getConfig() {
    return this.get('config', 'config');
  }

  seal(info: Omit<CatwalkCacheConsistencyInfo, 'version'>) {
    return this.set('consistency', 'consistency', {
      ...info,
      version: CatwalkCache.VERSION
    });
  }

  setConfig(config: AnnotationConfig) {
    return this.set('config', 'config', config);
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

  async validate(): Promise<boolean> {
    this.validateStores();

    const consistencyInfo = await this.getConsistencyInfo();

    if (!consistencyInfo) return false;

    if (consistencyInfo.version !== CatwalkCache.VERSION) return false;

    const rowCount = await this.count('rows');

    if (rowCount !== consistencyInfo.count) return false;

    const annotationConfig = await this.getConfig();

    if (!annotationConfig) return false;

    if (!validateAnnotationConfig(annotationConfig)) return false;

    return true;
  }

  async openAndValidateOrDelete(): Promise<boolean> {
    await this.open();

    const isValid = await this.validate();

    if (!isValid) {
      await this.delete();
      await this.open();
    }

    return isValid;
  }
}

const cache = new CatwalkCache();

export default cache;
