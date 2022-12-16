import assert from 'assert';
import seedrandom from 'seedrandom';

import {createRandomKeySuggestion} from '../src/lib/keys';

describe('Key suggestion', () => {
  it('should return suitable keys.', () => {
    const rng = seedrandom('test');

    const suggestKey = createRandomKeySuggestion(rng);

    const alreadyUsed = new Set(['A', 'Z', 'E']);

    const suggestions: Array<string> = [];

    for (let i = 0; i < 10; i++) {
      suggestions.push(suggestKey(alreadyUsed));
      alreadyUsed.add(suggestKey[suggestKey.length - 1]);
    }

    assert.deepStrictEqual(suggestions, [
      'B',
      'S',
      'M',
      'O',
      'P',
      'I',
      'D',
      'R',
      'L',
      'S'
    ]);
  });
});
