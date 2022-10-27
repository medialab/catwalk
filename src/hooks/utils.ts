import {useState} from 'react';

export function useToggleState(defaultValue = false): [boolean, () => void] {
  const [isActive, setIsActive] = useState(defaultValue);

  return [
    isActive,
    () => {
      setIsActive(!isActive);
    }
  ];
}
