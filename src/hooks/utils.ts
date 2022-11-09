import {useState} from 'react';
import {useAtom, useSetAtom, useAtomValue, WritableAtom} from 'jotai';

import Box from '../lib/box';

export function useToggleState(defaultValue = false): [boolean, () => void] {
  const [isActive, setIsActive] = useState(defaultValue);

  return [
    isActive,
    () => {
      setIsActive(!isActive);
    }
  ];
}

export function useBoxedAtom<T>(
  atom: WritableAtom<Box<T> | null, Box<T> | null>
): [T | null, () => void, (newValue: T | null) => void] {
  const [box, setBox] = useAtom(atom);

  return [
    box !== null ? box.get() : null,
    (): void => {
      setBox(box !== null ? box.refresh() : null);
    },
    (value: T | null): void => {
      if (value !== null) setBox(Box.of(value));
      else setBox(null);
    }
  ];
}

export function useSetBoxedAtom<T>(
  atom: WritableAtom<Box<T> | null, Box<T> | null>
): (newValue: T | null) => void {
  const setBox = useSetAtom(atom);

  return (value: T | null): void => {
    if (value !== null) setBox(Box.of(value));
    else setBox(null);
  };
}

export function useBoxedAtomValue<T>(
  atom: WritableAtom<Box<T> | null, Box<T> | null>
): T | null {
  const box = useAtomValue(atom);

  return box ? box.get() : null;
}
