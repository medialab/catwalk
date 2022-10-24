import {useState} from 'react';
import {useKeypress} from '../../hooks';

import {ComponentMeta, ComponentStory} from '@storybook/react';

interface KeypressTesterProps {
  incrementKeyBinding: string;
  resetKeyBinding: string;
}

function KeypressTester({
  incrementKeyBinding,
  resetKeyBinding
}: KeypressTesterProps) {
  const [timesPressed, setTimesPressed] = useState(0);

  useKeypress(incrementKeyBinding, () => {
    setTimesPressed(x => x + 1);
  });

  useKeypress(resetKeyBinding, () => {
    setTimesPressed(0);
  });

  return (
    <div>
      <p>
        <strong>{incrementKeyBinding}</strong> was pressed {timesPressed} times.
      </p>
      <p>
        You can reset by pressing <strong>{resetKeyBinding}</strong>
      </p>
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
Default.args = {incrementKeyBinding: 'k', resetKeyBinding: 'Enter'};
