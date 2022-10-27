import {useEffect, useState, useCallback} from 'react';

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

  if (key.length === 1) key = key.toUpperCase();

  return key;
}

type VoidListener = () => void;
type LockListenerError = 'cancelled';
type LockListener = (error: LockListenerError | null, key?: string) => void;

// Using this global register not to multiply the event listeners on window
class KeypressListeners {
  map: Map<string, Set<VoidListener>>;
  lockListener: LockListener | null;

  constructor() {
    this.map = new Map();

    window.addEventListener('keyup', event => {
      // We don't want the event to fire if something important has focus
      if (document.activeElement !== document.body) return;

      const key = normalizeKey(event.key);

      if (this.lockListener) {
        this.lockListener(null, key);
        return;
      }

      const listenersForKey = this.map.get(key);

      if (!listenersForKey) return;

      listenersForKey.forEach(fn => fn());
    });
  }

  isLocked(): boolean {
    return !!this.lockListener;
  }

  lockWith(listener: LockListener) {
    if (this.lockListener) throw new Error('already locked');

    this.lockListener = listener;
  }

  unlock() {
    if (!this.lockListener) throw new Error('not locked');

    this.lockListener = null;
  }

  forceUnlock() {
    if (!this.lockListener) throw new Error('not locked');
    this.lockListener('cancelled');
    this.lockListener = null;
  }

  add(key: string, listener: VoidListener): void {
    key = normalizeKey(key);

    let listenersForKey = this.map.get(key);

    if (!listenersForKey) {
      listenersForKey = new Set();
      this.map.set(key, listenersForKey);
    }

    listenersForKey.add(listener);
  }

  delete(key: string, listener: VoidListener): void {
    key = normalizeKey(key);

    const listenersForKey = this.map.get(key);

    if (!listenersForKey) return;

    if (listenersForKey.size === 1) this.map.delete(key);
    else listenersForKey.delete(listener);
  }
}

const LISTENERS = new KeypressListeners();

export function useKeypress(key: string, listener: VoidListener) {
  useEffect(() => {
    LISTENERS.add(key, listener);

    return () => {
      LISTENERS.delete(key, listener);
    };
  }, []);
}

// TODO: useCallback
export function useAskForKeypress(): [
  isAskingFoKeypress: boolean,
  askForKeypress: () => Promise<string>,
  cancelAskForKeypress: () => void
] {
  const [isAskingForKeypress, setIsAskingForKeypress] = useState(
    LISTENERS.isLocked()
  );

  const askForKeypress = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      (document.activeElement as HTMLElement).blur();

      LISTENERS.lockWith((error, key) => {
        if (error) return reject(error);

        LISTENERS.unlock();
        resolve(key as string);
        setIsAskingForKeypress(false);
      });
      setIsAskingForKeypress(true);
    });
  }, []);

  const cancelAskForKeypress = useCallback((): void => {
    LISTENERS.forceUnlock();
    setIsAskingForKeypress(false);
  }, []);

  return [isAskingForKeypress, askForKeypress, cancelAskForKeypress];
}
