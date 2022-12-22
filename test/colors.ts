import assert from 'assert';
import seedrandom from 'seedrandom';

import {createRandomColor} from '../src/lib/colors';

describe('Colors', () => {
  describe('randomColor', () => {
    it('should return a proper rgb hex color.', () => {
      const randomColor = createRandomColor(seedrandom('test'));
      const color = randomColor();

      assert.strictEqual(color, '#df67f6');
    });
  });
});
