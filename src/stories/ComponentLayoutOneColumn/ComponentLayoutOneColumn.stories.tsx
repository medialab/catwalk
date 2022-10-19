import {ComponentStory, ComponentMeta} from '@storybook/react';

import LayoutOneColumnContainer from '../../components/LayoutOneColumn/LayoutOneColumnContainer';
import LayoutOneColumnElement from '../../components/LayoutOneColumn/LayoutOneColumnElement';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Layouts/One column',
  component: LayoutOneColumnContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'}
  }
} as ComponentMeta<typeof LayoutOneColumnContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LayoutOneColumnContainer> = args => 
  <LayoutOneColumnContainer 
    {...args} 
    style={{background: 'red'}}
  />;

export const Normal = Template.bind({});
Normal.args = {
  children: (
    <LayoutOneColumnElement
      style={{background: 'green'}}
    >
      Ceci est un test
    </LayoutOneColumnElement>
  )
};