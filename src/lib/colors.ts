import type {RNGFunction} from 'pandemonium/types';

export function createRandomColor(rng: RNGFunction) {
  const randomByte = () => Math.floor(rng() * 256);

  return (): string => {
    const rgb = [randomByte(), randomByte(), randomByte()];

    return `#${rgb.map(c => c.toString(16)).join('')}`;
  };
}

export const randomColor = createRandomColor(Math.random);
