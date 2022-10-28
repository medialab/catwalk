export function mapEntries<I, V, K extends string = string>(
  items: Array<I>,
  iteratee: (item: I) => [key: K, value: V]
): Record<K, V> {
  const result = {} as Record<K, V>;

  items.forEach(item => {
    const [k, v] = iteratee(item);
    result[k] = v;
  });

  return result;
}

export function flipObject<K extends keyof any, V extends keyof any>(
  o: Record<K, V>
): Record<V, K> {
  const t = {} as Record<V, K>;

  for (const k in o) {
    t[o[k]] = k;
  }

  return t;
}

export type TryPromiseResult<T> =
  | [error: unknown, result: null]
  | [error: null, result: T];

export function tryPromise<T>(
  promise: Promise<T>
): Promise<TryPromiseResult<T>> {
  return promise.then(
    result => {
      return [null, result];
    },
    error => {
      return [error, null];
    }
  );
}
