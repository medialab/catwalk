import {ComponentMeta, ComponentStory} from '@storybook/react';
import {atom, useAtom} from 'jotai';

import Box from '../../lib/box';

type Counter = {count: number};

const testAtom = atom<Counter>({count: 1});
const boxedAtom = atom<Box<Counter>>(Box.of({count: 1}));

let renders = 0;

function AtomTester() {
  renders++;

  const [value, setValue] = useAtom(testAtom);
  const [boxedValue, setBoxedValue] = useAtom(boxedAtom);

  return (
    <div>
      <p>Current value of atom: {value.count}</p>
      <p>Current value of boxed value: {boxedValue.get().count}</p>
      <p>Number of renders: {renders}</p>
      <p>
        <button onClick={() => setValue({count: value.count + 1})}>add</button>
        <button onClick={() => setValue(value)}>noop</button>
        <button onClick={() => setValue({...value})}>immutable noop</button>
        <button
          onClick={() => {
            value.count++;
            setValue(value);
          }}>
          mutate
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            setBoxedValue(
              boxedValue.mutate(wrappedValue => {
                wrappedValue.count++;
              })
            );
          }}>
          add boxed
        </button>
        <button
          onClick={() => {
            setBoxedValue(
              boxedValue.mutate(() => {
                // nothing...
              })
            );
          }}>
          noop boxed
        </button>
      </p>
    </div>
  );
}

export default {
  title: 'Hooks/useAtom',
  component: AtomTester
} as ComponentMeta<typeof AtomTester>;

const Template: ComponentStory<typeof AtomTester> = () => {
  return (
    <div style={{padding: '25px'}}>
      <AtomTester />
    </div>
  );
};

export const Default = Template.bind({});
