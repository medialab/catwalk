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

    assert.deepStrictEqual(actions, [
      {
        type: 'drop-categorization',
        categorization: {name: 'One', id: 'one', color: 'cyan', modalities: []}
      }
    ]);
  });

  it('should correctly detect when a categorization is renamed.', () => {
    const before = [createCategorization('One', 'cyan', 'one')];
    const after = [createCategorization('Renamed One', 'cyan', 'one')];

    const [actions] = diffAnnotationSchemas(before, after);

    assert.deepStrictEqual(actions, [
      {
        type: 'rename-categorization',
        oldName: 'One',
        newName: 'Renamed One',
        categorization: {
          name: 'Renamed One',
          id: 'one',
          color: 'cyan',
          modalities: []
        }
      }
    ]);
  });

  it('should correctly detect when a categorization is recolored.', () => {
    const before = [createCategorization('One', 'cyan', 'one')];
    const after = [createCategorization('One', 'blue', 'one')];

    const [actions] = diffAnnotationSchemas(before, after);

    assert.deepStrictEqual(actions, [
      {
        type: 'recolor-categorization',
        categorization: {name: 'One', id: 'one', color: 'blue', modalities: []},
        oldColor: 'cyan',
        newColor: 'blue'
      }
    ]);
  });
});
