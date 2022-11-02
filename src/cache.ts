import type {CSVRow, CSVRows, AnnotationConfig} from './types';
import PersistentCache from './lib/cache';
import {validateAnnotationConfig} from './validation';

// NOTE: the cache contains a counter of number of items expected
// in the rows store, to avoid issues where page was reloaded when inserting
// rows in the cache and avoid data loss.
interface CatwalkCacheCheckItem {
  count: number;
  version: string;
}

interface CatwalkCacheStore {
  rows: CSVRow;
  config: AnnotationConfig;
  check: CatwalkCacheCheckItem;
}

interface CatwalkCacheStoreKeys {
  rows: number;
  config: 'config';
  check: 'check';
}

export class CatwalkCache extends PersistentCache<
  CatwalkCacheStore,
  CatwalkCacheStoreKeys
> {
  static VERSION = '1.0.0';

  constructor() {
    super('catwalk-cache', ['rows', 'config', 'check']);
  }

  getCheck() {
    return this.get('check', 'check');
  }

  getConfig() {
    return this.get('config', 'config');
  }

  setCheck(partialCheck: Omit<CatwalkCacheCheckItem, 'version'>) {
    const check = {...partialCheck, version: CatwalkCache.VERSION};

    return this.set('check', 'check', check);
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

    const check = await this.getCheck();

    if (!check) return false;

    if (check.version !== CatwalkCache.VERSION) return false;

    const rowCount = await this.count('rows');

    if (rowCount !== check.count) return false;

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
