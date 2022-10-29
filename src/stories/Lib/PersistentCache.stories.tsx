import {ComponentMeta, ComponentStory} from '@storybook/react';
import {useState} from 'react';
import {random, randomString} from 'pandemonium';

import PersistentCache from '../../lib/cache';

interface Stores {
  items: {name: string; age: number};
}

interface Keys {
  items: number;
}

const cache = new PersistentCache<Stores, Keys>('catwalk-storybook', ['items']);

let id = 0;

function PersistentCacheTester() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>
        Cache <strong>{cache.name}</strong> is supposed to have stores:{' '}
        <strong>{Array.from(cache.stores).join(', ')}</strong>
      </p>
      {!isOpen && (
        <p>
          <button
            onClick={async () => {
              await cache.open();
              setIsOpen(true);
            }}>
            open
          </button>
        </p>
      )}
      {isOpen && <p>Database is now open!</p>}
      {isOpen && (
        <p>
          <button
            onClick={async () => {
              await cache.set('items', id++, {
                name: randomString(5, 10),
                age: random(21, 87)
              });
            }}>
            add
          </button>
        </p>
      )}
      <p>
        <button
          onClick={async () => {
            await cache.delete();
            setIsOpen(false);
          }}>
          delete
        </button>
      </p>
    </div>
  );
}

export default {
  title: 'Lib/PersistentCache',
  component: PersistentCacheTester
} as ComponentMeta<typeof PersistentCacheTester>;

const Template: ComponentStory<typeof PersistentCacheTester> = () => {
  return (
    <div style={{padding: '25px'}}>
      <PersistentCacheTester />
    </div>
  );
};

export const Default = Template.bind({});
