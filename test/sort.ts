import assert from 'assert';

import type {CSVRows, AnnotationSchema} from '../src/types';
import sort, {indices} from '../src/lib/sort';

describe('Sorting', () => {
  const schema: AnnotationSchema = [
    {
      id: '0',
      name: 'status',
      color: 'blue',
      modalities: [
        {id: '0', name: 'IN', key: 'A'},
        {id: '1', name: 'OUT', key: 'Z'}
      ]
    },
    {
      id: '1',
      name: 'color',
      color: 'red',
      modalities: [
        {id: '0', name: 'blue', key: 'B'},
        {id: '1', name: 'red', key: 'R'}
      ]
    }
  ];

  const rows: CSVRows = [
    {name: 'John', status: 'IN', color: 'blue'},
    {name: 'Lisa', status: 'OUT'},
    {name: 'Catherine', color: 'red'},
    {name: 'Damien', status: 'OUT', color: 'blue'}
  ];

  it('should properly sort by table order.', () => {
    const argsort = indices(rows);

    assert.deepStrictEqual(argsort, indices(rows));

    sort(schema, 'table', rows, argsort);

    assert.deepStrictEqual(argsort, indices(rows));
  });

  it('should properly sort by incompleteness.', () => {
    const argsort = indices(rows);

    sort(schema, 'incomplete', rows, argsort);

    assert.deepStrictEqual(argsort, new Uint8Array([1, 2, 0, 3]));

    sort(schema, 'table', rows, argsort);

    assert.deepStrictEqual(argsort, indices(rows));
  });

  it('table sort and incomplete should be equivalent if nothing is tagged.', () => {
    const untaggedRows = rows.map(row => {
      const copy = {...row};

      schema.forEach(categorization => {
        delete copy[categorization.name];
      });

      return copy;
    });

    const argsort = indices(untaggedRows);

    sort(schema, 'incomplete', untaggedRows, argsort);

    assert.deepStrictEqual(argsort, indices(rows));
  });
});
