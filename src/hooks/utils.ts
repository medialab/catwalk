import {useState} from 'react';
import {useAtom, useSetAtom, WritableAtom} from 'jotai';

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
  atom: WritableAtom<Box<T>, Box<T>>
): [T, (newValue: T) => void] {
  const [box, setBox] = useAtom(atom);

  return [
    box.get(),
    (value: T): void => {
      setBox(Box.of(value));
    }
  ];
}

export function useNullableBoxedAtom<T>(
  atom: WritableAtom<Box<T> | null, Box<T> | null>
): [T | null, (newValue: T | null) => void] {
  const [box, setBox] = useAtom(atom);

  return [
    box !== null ? box.get() : null,
    (value: T | null): void => {
      if (value !== null) setBox(Box.of(value));
      else setBox(null);
    }
  ];
}

export function useSetBoxedAtom<T>(
  atom: WritableAtom<Box<T>, Box<T>>
): (newValue: T) => void {
  const setBox = useSetAtom(atom);

  return (value: T): void => {
    setBox(Box.of(value));
  };
}

export function useSetNullableBoxedAtom<T>(
  atom: WritableAtom<Box<T> | null, Box<T> | null>
): (newValue: T | null) => void {
  const setBox = useSetAtom(atom);

  return (value: T | null): void => {
    if (value !== null) setBox(Box.of(value));
    else setBox(null);
  };
}
