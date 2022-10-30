import assert from 'assert';

import type {CSVRows} from '../src/types';
import sort, {range} from '../src/lib/sort';

describe('Sorting', () => {
  const rows: CSVRows = [
    {name: 'john', status: 'IN', color: 'blue'},
    {name: 'Lisa', status: 'OUT'},
    {name: 'Catherine', color: 'red'}
  ];

  it('should properly sort by table order.', () => {
    const argsort = range(rows);

    assert.deepStrictEqual(argsort, [0, 1, 2]);
  });
});
