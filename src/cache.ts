import type {CSVRow, CSVRows, AnnotationConfig} from './types';
import PersistentCache from './lib/cache';

// NOTE: the cache contains a counter of number of items expected
// in the rows store, to avoid issues where page was reloaded when inserting
// rows in the cache and avoid data loss.
interface CatwalkCacheCheckItem {
  count: number;
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

// TODO: validate (check count + validate config), openAndValidateOrDelete
export class CatwalkCache extends PersistentCache<
  CatwalkCacheStore,
  CatwalkCacheStoreKeys
> {
  constructor() {
    super('catwalk-cache', ['rows', 'config', 'check']);
  }

  getConfig() {
    return this.get('config', 'config');
  }

  setConfig(config: AnnotationConfig): Promise<void> {
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
}

const cache = new CatwalkCache();

export default cache;
