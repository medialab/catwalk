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
