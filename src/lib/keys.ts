import type {RNGFunction} from 'pandemonium/types';
import {createChoice} from 'pandemonium/choice';

const KEY_SUGGESTIONS = 'qwertyuiop asdfghjkl zxcvbnm'
  .trim()
  .split('')
  .filter(c => c !== ' ')
  .map(c => c.toUpperCase());

export function createRandomKeySuggestion(rng: RNGFunction) {
  const choice = createChoice<string>(rng);

  return function (alreadyUsed: Set<string>): string {
    const possibleKeys = KEY_SUGGESTIONS.filter(key => !alreadyUsed.has(key));

    if (possibleKeys.length === 0)
      throw new Error('cannot suggest key. this is a loophole!');

    return choice(possibleKeys);
  };
}

export const suggestKey = createRandomKeySuggestion(Math.random);
