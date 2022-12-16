import assert from 'assert';

import {createCategorization, createModality} from '../src/model';
import {diffAnnotationSchemas} from '../src/model/diff';

describe('Diff', () => {
  it('should correctly detect when a categorization is added.', () => {
    const before = [createCategorization('One', 'cyan', 'one')];
    const after = before.concat(createCategorization('Two', 'red', 'two'));

    const [actions] = diffAnnotationSchemas(before, after);

    assert.deepStrictEqual(actions, [
      {
        type: 'add-categorization',
        categorization: {name: 'Two', id: 'two', color: 'red', modalities: []}
      }
    ]);
  });

  it('should correctly detect when a categorization is dropped.', () => {
    const before = [
      createCategorization('One', 'cyan', 'one'),
      createCategorization('Two', 'red', 'two')
    ];
    const after = before.slice().filter(c => c.name === 'Two');

    const [actions] = diffAnnotationSchemas(before, after);

    assert.deepEqual(actions, [
      {
        type: 'drop-categorization',
        categorization: {name: 'One', id: 'one', color: 'cyan', modalities: []}
      }
    ]);
  });
});
