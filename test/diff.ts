import assert from 'assert';

// import util from 'util';
// util.inspect.defaultOptions.depth = null;

import {createCategorization, createModality} from '../src/model';
import {diffAnnotationSchemas} from '../src/model/diff';

describe('Diff', () => {
  it('should correctly detect when a categorization is added.', () => {
    const before = [createCategorization('One', 'cyan', 'one')];
    const after = before.concat(createCategorization('Two', 'red', 'two'));

    const {actions} = diffAnnotationSchemas(before, after);

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

    const {actions} = diffAnnotationSchemas(before, after);

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

    const {actions} = diffAnnotationSchemas(before, after);

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

    const {actions} = diffAnnotationSchemas(before, after);

    assert.deepStrictEqual(actions, [
      {
        type: 'recolor-categorization',
        categorization: {name: 'One', id: 'one', color: 'blue', modalities: []},
        oldColor: 'cyan',
        newColor: 'blue'
      }
    ]);
  });

  it('should correctly warn when a categorization seems irrelevant.', () => {
    const after = [createCategorization('One', 'blue', 'one')];

    const {warnings} = diffAnnotationSchemas([], after);

    assert.deepStrictEqual(warnings, [
      {
        type: 'irrelevant-categorization',
        categorization: {name: 'One', id: 'one', color: 'blue', modalities: []},
        categorizationIndex: 0,
        cardinality: 0
      }
    ]);
  });

  it('should detect categorization name conflicts.', () => {
    const after = [
      createCategorization('One', 'cyan', 'one'),
      createCategorization('One', 'cyan', 'two')
    ];

    const {errors} = diffAnnotationSchemas([], after);

    assert.deepStrictEqual(errors, [
      {
        type: 'categorization-name-conflict',
        categorizations: [
          [0, {name: 'One', id: 'one', color: 'cyan', modalities: []}],
          [1, {name: 'One', id: 'two', color: 'cyan', modalities: []}]
        ],
        name: 'One'
      }
    ]);
  });

  it('should correctly detect when modalities are dropped.', () => {
    const before = [
      createCategorization('One', 'cyan', 'one', [
        createModality('A', 'IN', 'one')
      ])
    ];
    const after = [createCategorization('One', 'cyan', 'one')];

    const {actions} = diffAnnotationSchemas(before, after);

    assert.deepStrictEqual(actions, [
      {
        type: 'drop-modality',
        modality: {id: 'one', name: 'IN', key: 'A'},
        categorization: {name: 'One', id: 'one', color: 'cyan', modalities: []},
        categorizationIndex: 0
      }
    ]);
  });

  it('should correctly detect when modalities are added.', () => {
    const before = [createCategorization('One', 'cyan', 'one')];
    const after = [
      createCategorization('One', 'cyan', 'one', [
        createModality('A', 'IN', 'one')
      ])
    ];

    const {actions} = diffAnnotationSchemas(before, after);

    assert.deepStrictEqual(actions, [
      {
        type: 'add-modality',
        modality: {id: 'one', name: 'IN', key: 'A'},
        categorization: {
          name: 'One',
          id: 'one',
          color: 'cyan',
          modalities: [{name: 'IN', key: 'A', id: 'one'}]
        },
        categorizationIndex: 0
      }
    ]);
  });

  it('should be able to detect modality name conflicts.', () => {
    const after = [
      createCategorization('One', 'cyan', 'one', [
        createModality('A', 'IN', 'a'),
        createModality('B', 'IN', 'b')
      ])
    ];

    const {errors} = diffAnnotationSchemas([], after);

    assert.deepStrictEqual(errors, [
      {
        type: 'modality-name-conflict',
        modalities: [
          [0, {id: 'a', name: 'IN', key: 'A'}],
          [1, {id: 'b', name: 'IN', key: 'B'}]
        ],
        name: 'IN',
        categorization: {
          name: 'One',
          id: 'one',
          color: 'cyan',
          modalities: [
            {id: 'a', name: 'IN', key: 'A'},
            {id: 'b', name: 'IN', key: 'B'}
          ]
        },
        categorizationIndex: 0
      }
    ]);
  });

  it('should correctly detect when modalities are renamed.', () => {
    const before = [
      createCategorization('One', 'cyan', 'one', [
        createModality('A', 'IN', 'a')
      ])
    ];

    const after = [
      createCategorization('One', 'cyan', 'one', [
        createModality('A', 'OUT', 'a')
      ])
    ];

    const {actions} = diffAnnotationSchemas(before, after);

    assert.deepStrictEqual(actions, [
      {
        type: 'rename-modality',
        categorization: {
          name: 'One',
          id: 'one',
          color: 'cyan',
          modalities: [{id: 'a', name: 'OUT', key: 'A'}]
        },
        categorizationIndex: 0,
        modality: {id: 'a', name: 'OUT', key: 'A'},
        oldName: 'IN',
        newName: 'OUT'
      }
    ]);
  });
});
