import {tryPromise} from './utils';

export type PersistentCacheError =
  | 'cant-open-db'
  | 'cant-close'
  | 'cant-create-store'
  | 'cant-delete-db'
  | 'transaction-error'
  | 'transaction-aborted'
  | 'cursor-error';

type IDBCursorWithValueEvent = Event & {
  target: {result: IDBCursorWithValue | undefined};
};

export default class PersistentCache<
  Stores,
  Keys extends {[S in keyof Stores]?: IDBValidKey}
> {
  name: string;
  db: IDBDatabase | null = null;
  stores: Set<keyof Stores & string>;

  constructor(name: string, stores: Array<keyof Stores & string>) {
    this.name = name;
    this.stores = new Set(stores);
  }

  private assertIsOpen(db: IDBDatabase | null): IDBDatabase {
    if (!db)
      throw new Error(
        'cannot use this PersistentCache method if database is not opened!'
      );

    return db;
  }

  open(): Promise<void> {
    return new Promise(
      (resolve, reject: (type: PersistentCacheError) => void) => {
        const req = indexedDB.open(this.name);

        req.onsuccess = () => {
          this.db = req.result;
          resolve();
        };

        req.onerror = () => {
          reject('cant-open-db');
        };

        req.onupgradeneeded = () => {
          this.db = req.result;

          this.stores.forEach(name => {
            const objectStore = this.db?.createObjectStore(name);
            if (!objectStore) return reject('cant-create-store');
          });
        };
      }
    );
  }

  close(): void {
    this.db?.close();
  }

  delete(): Promise<void> {
    return new Promise(
      (resolve, reject: (error: PersistentCacheError) => void) => {
        this.close();

        const req = indexedDB.deleteDatabase(this.name);

        req.onerror = () => reject('cant-delete-db');
        req.onsuccess = () => resolve();
      }
    );
  }

  transaction(
    stores: Array<keyof Stores & string> | (keyof Stores & string),
    mode: IDBTransactionMode,
    callback: (transaction: IDBTransaction) => Promise<void>
  ): Promise<void> {
    const db = this.assertIsOpen(this.db);

    return new Promise(
      (resolve, reject: (error: PersistentCacheError) => void) => {
        const t = db.transaction(stores, mode);

        t.onerror = () => reject('transaction-error');
        // t.onabort = () => reject('transaction-aborted');
        t.oncomplete = () => resolve();

        return callback(t).then(
          () => {
            t.commit();
            resolve();
          },
          error => {
            t.abort();
            reject(error);
          }
        );
      }
    );
  }

  set<Store extends keyof Stores & string, Key extends keyof Keys>(
    store: Store,
    key: Keys[Key],
    item: Stores[Store]
  ): Promise<void> {
    return this.transaction(store, 'readwrite', t => {
      t.objectStore(store).add(item, key);
      return Promise.resolve();
    });
  }

  forEach<Store extends keyof Stores & string, Key extends keyof Keys>(
    store: Store,
    callback: (item: Stores[Store], index: Keys[Key]) => void
  ): Promise<void> {
    return this.transaction(store, 'readonly', t => {
      return new Promise(
        (resolve, reject: (error: PersistentCacheError) => void) => {
          const cursorRequest = t.objectStore(store).openCursor();

          cursorRequest.onerror = () => reject('cursor-error');
          cursorRequest.onsuccess = (event: IDBCursorWithValueEvent) => {
            const cursor = event.target.result;

            if (cursor) {
              callback(cursor.value as Stores[Store], cursor.key as Keys[Key]);
              cursor.continue();
            } else {
              return resolve();
            }
          };
        }
      );
    });
  }
}
