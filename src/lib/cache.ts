export type PersistentCacheError =
  | 'cant-open-db'
  | 'cant-close'
  | 'cant-create-store'
  | 'cant-delete-db'
  | 'transaction-error'
  | 'transaction-aborted'
  | 'cursor-error'
  | 'cant-get'
  | 'cant-count';

type IDBCursorWithValueEvent = Event & {
  target: {result: IDBCursorWithValue | undefined};
};

export default class PersistentCache<
  Stores,
  Keys extends {[S in keyof Stores]: IDBValidKey}
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

  isOpen(): boolean {
    return !!this.db;
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

  validateStores(): boolean {
    const db = this.assertIsOpen(this.db);

    const actualStores = new Set(Array.from(db.objectStoreNames));

    this.stores.forEach(store => {
      if (!actualStores.has(store)) return false;
    });

    return true;
  }

  transaction<T = void>(
    stores: Array<keyof Stores & string> | (keyof Stores & string),
    mode: IDBTransactionMode,
    callback: (transaction: IDBTransaction) => Promise<T>
  ): Promise<T> {
    const db = this.assertIsOpen(this.db);

    return new Promise(
      (resolve, reject: (error: PersistentCacheError) => void) => {
        const t = db.transaction(stores, mode);

        let result: T;

        t.onerror = () => reject('transaction-error');
        // t.onabort = () => reject('transaction-aborted');
        t.oncomplete = () => resolve(result);

        return callback(t).then(
          (wrappedResult: T) => {
            result = wrappedResult;
            t.commit();
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
      t.objectStore(store).put(item, key);
      return Promise.resolve();
    });
  }

  update<Store extends keyof Stores & string, Key extends keyof Keys>(
    store: Store,
    key: Keys[Key],
    updater: (item: Stores[Store]) => Stores[Store]
  ): Promise<void> {
    return this.transaction(store, 'readwrite', t => {
      return new Promise(
        (resolve, reject: (error: PersistentCacheError) => void) => {
          const objectStore = t.objectStore(store);

          const req = objectStore.get(key);

          req.onerror = () => reject('cant-get');
          req.onsuccess = () => {
            const updatedItem = updater(req.result);
            objectStore.put(updatedItem, key);
            return resolve();
          };
        }
      );
    });
  }

  count<Store extends keyof Stores & string>(store: Store): Promise<number> {
    return this.transaction(store, 'readonly', t => {
      return new Promise(
        (resolve, reject: (error: PersistentCacheError) => void) => {
          const req = t.objectStore(store).count();
          req.onerror = () => reject('cant-count');
          req.onsuccess = () => resolve(req.result);
        }
      );
    });
  }

  get<Store extends keyof Stores & string, Key extends keyof Keys>(
    store: Store,
    key: Keys[Key]
  ): Promise<Stores[Store] | undefined> {
    return this.transaction(store, 'readwrite', t => {
      return new Promise(
        (resolve, reject: (error: PersistentCacheError) => void) => {
          const req = t.objectStore(store).get(key);
          req.onerror = () => reject('cant-get');
          req.onsuccess = () => resolve(req.result);
        }
      );
    });
  }

  getAll<Store extends keyof Stores & string>(
    store: Store
  ): Promise<Array<Stores[Store]>> {
    return this.transaction(store, 'readwrite', t => {
      return new Promise(
        (resolve, reject: (error: PersistentCacheError) => void) => {
          const req = t.objectStore(store).getAll();
          req.onerror = () => reject('cant-get');
          req.onsuccess = () => resolve(req.result);
        }
      );
    });
  }

  forEachWithCursor<Store extends keyof Stores & string>(
    store: Store,
    callback: (cursor: IDBCursorWithValue) => void,
    mode: IDBTransactionMode = 'readonly'
  ): Promise<void> {
    return this.transaction(store, mode, t => {
      return new Promise(
        (resolve, reject: (error: PersistentCacheError) => void) => {
          const cursorRequest = t.objectStore(store).openCursor();

          cursorRequest.onerror = () => reject('cursor-error');
          cursorRequest.onsuccess = (event: IDBCursorWithValueEvent) => {
            const cursor = event.target.result;

            if (cursor) {
              callback(cursor);
              cursor.continue();
            } else {
              return resolve();
            }
          };
        }
      );
    });
  }

  forEach<Store extends keyof Stores & string, Key extends keyof Keys>(
    store: Store,
    callback: (item: Stores[Store], index: Keys[Key]) => void
  ): Promise<void> {
    return this.forEachWithCursor(store, cursor => {
      callback(cursor.value as Stores[Store], cursor.key as Keys[Key]);
    });
  }

  updateEach<Store extends keyof Stores & string, Key extends keyof Keys>(
    store: Store,
    updater: (item: Stores[Store], index: Keys[Key]) => Stores[Store]
  ): Promise<void> {
    return this.forEachWithCursor(
      store,
      cursor => {
        const newValue = updater(
          cursor.value as Stores[Store],
          cursor.key as Keys[Key]
        );

        cursor.update(newValue);
      },
      'readwrite'
    );
  }
}
