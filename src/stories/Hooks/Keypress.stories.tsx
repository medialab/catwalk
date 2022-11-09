import {useState} from 'react';
import {useKeypress, useAskForKeypress} from '../../hooks';
import {tryPromise} from '../../lib/utils';

import {ComponentMeta, ComponentStory} from '@storybook/react';

interface KeypressTesterProps {
  incrementKeyBinding: string;
  decrementKeyBinding: string;
  resetKeyBinding: string;
}

function KeypressTester({
  incrementKeyBinding,
  decrementKeyBinding,
  resetKeyBinding
}: KeypressTesterProps) {
  const [count, setCount] = useState(0);
  const [chosenKey, setChosenKey] = useState<string | null>(null);

  useKeypress(incrementKeyBinding, () => {
    setCount(x => x + 1);
  });

  useKeypress(decrementKeyBinding, () => {
    setCount(x => x - 1);
  });

  useKeypress(resetKeyBinding, () => {
    setCount(0);
  });

  const [isAskingFoKeypress, askForKeypress, cancelAskForKeypress] =
    useAskForKeypress();

  const ask = async () => {
    setChosenKey(null);
    const [error, key] = await tryPromise(askForKeypress());
    setChosenKey(error ? null : key);
  };

  const cancelAsk = () => {
    cancelAskForKeypress();
    setChosenKey(null);
  };

  return (
    <div>
      <p>
        <strong>Count</strong> = {count}
      </p>
      <p>
        You can increment by pressing <strong>{incrementKeyBinding}</strong> and
        decrement by pressing <strong>{decrementKeyBinding}</strong>
      </p>
      <p>
        You can reset by pressing <strong>{resetKeyBinding}</strong>
      </p>
      <input
        type="text"
        style={{width: '400px'}}
        placeholder="Type things here to test that hotkey does not work..."
      />
      <hr />
      <p>
        <button onClick={ask}>Choose a key</button>
      </p>
      {isAskingFoKeypress && <p>Type the chosen key please...</p>}
      {isAskingFoKeypress && (
        <p>
          <button onClick={cancelAsk}>Cancel</button>
        </p>
      )}
      {chosenKey && (
        <p>
          Chosen key is <strong>{chosenKey}</strong>
        </p>
      )}
    </div>
  );
}

export default {
  title: 'Hooks/useKeypress',
  component: KeypressTester
} as ComponentMeta<typeof KeypressTester>;

const Template: ComponentStory<typeof KeypressTester> = args => {
  return (
    <div style={{padding: '10px'}}>
      <KeypressTester {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  incrementKeyBinding: 'w',
  decrementKeyBinding: 'x',
  resetKeyBinding: 'Enter'
};
