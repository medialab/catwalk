import {ComponentMeta, ComponentStory} from '@storybook/react';
import {useState} from 'react';
import {random, randomString} from 'pandemonium';

import PersistentCache from '../../lib/cache';

interface CacheItem {
  name: string;
  age: number;
}

interface Stores {
  items: CacheItem;
}

interface Keys {
  items: number;
}

const cache = new PersistentCache<Stores, Keys>('catwalk-storybook', ['items']);

let id = 0;

function PersistentCacheTester() {
  const [isOpen, setIsOpen] = useState(false);
  const [cacheData, setCacheData] = useState<Array<CacheItem>>([]);

  const refresh = async () => {
    const data: Array<CacheItem> = [];

    await cache.forEach('items', item => {
      data.push(item);
    });

    setCacheData(data);
  };

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
              await refresh();
              setIsOpen(true);
            }}>
            open
          </button>
        </p>
      )}
      {isOpen && <p>Database is now open!</p>}
      {isOpen && (
        <div style={{overflowY: 'auto', maxHeight: '400px', width: '200px'}}>
          <table>
            <thead style={{textAlign: 'left'}}>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {cacheData.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {isOpen && (
        <p>
          <button
            onClick={async () => {
              await cache.set('items', id++, {
                name: randomString(5, 10),
                age: random(21, 87)
              });
              await refresh();
            }}>
            add
          </button>
          <button
            onClick={async () => {
              await refresh();
            }}>
            refresh
          </button>
        </p>
      )}
      <p>
        <button
          onClick={async () => {
            await cache.delete();
            setIsOpen(false);
            setCacheData([]);
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
