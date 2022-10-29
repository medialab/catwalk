import {ComponentMeta, ComponentStory} from '@storybook/react';
import {useState} from 'react';

import {PersistentCache} from '../../lib/cache';

const cache = new PersistentCache('catwalk-storybook', ['items']);

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
