export type PersistentCacheError =
  | 'cant-open-db'
  | 'cant-close'
  | 'cant-create-store'
  | 'cant-delete-db'
  | 'transaction-error'
  | 'transaction-aborted';

export class PersistentCache<Store extends string> {
  name: string;
  db: IDBDatabase | null = null;
  stores: Set<Store>;

  constructor(name: string, stores: Array<Store>) {
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

          resolve();
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
    stores: Array<Store>,
    mode: IDBTransactionMode,
    callback: (transaction: IDBTransaction) => void
  ): Promise<void> {
    const db = this.assertIsOpen(this.db);

    return new Promise(
      (resolve, reject: (error: PersistentCacheError) => void) => {
        const t = db.transaction(stores, mode);

        t.onerror = () => reject('transaction-error');
        t.onabort = () => reject('transaction-aborted');
        t.oncomplete = () => resolve();

        callback(t);

        t.commit();
      }
    );
  }
}
