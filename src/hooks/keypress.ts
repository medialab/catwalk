import {useEffect, useRef} from 'react';

// NOTE: those aliases are not organized to favor newest browser standards
// over older ones (such as IE, old Firefox etc.), but favor human comprehension
// in a potential configuration file.
// For instance, 'Space' is easily more understandable in a YAML config file
// than a plain empty looking string such as ' '.
const ALIASES = {
  Win: 'Meta',
  Scroll: 'ScrollLock',
  Spacebar: 'Space',
  ' ': 'Space',
  Down: 'ArrowDown',
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Up: 'ArrowUp',
  Del: 'Delete',
  Crsel: 'CrSel',
  Exsel: 'ExSel',
  Apps: 'ContextMenu',
  Esc: 'Escape',
  Decimal: '.',
  Multiply: '*',
  Add: '+',
  Subtract: '-',
  Divide: '/'
};

// We resolve some key aliases and we lowercase only if the key is a single
// character (to avoid lowercasing special key names such as `Space` etc.)
function normalizeKey(key: string): string {
  key = ALIASES[key] || key;

  if (key.length === 1) key = key.toLowerCase();

  return key;
}

export function useKeypress(key: string, listener: () => void) {
  const listenerRef = useRef<(event: KeyboardEvent) => void>();

  useEffect(() => {
    listenerRef.current = event => {
      const clientKey = normalizeKey(event.key);

      if (clientKey === key) listener();
    };
  }, [key, listener]);

  useEffect(() => {
    const windowListener = event => {
      listenerRef.current?.(event);
    };

    window.addEventListener('keyup', windowListener);

    return () => {
      window.removeEventListener('keyup', windowListener);
    };
  }, []);
}
