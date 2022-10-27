import {ComponentMeta, ComponentStory} from '@storybook/react';

import Layout from '../../components/Layout/Layout';
import MainColumn from '../../components/Layout/MainColumn';
import MediaPreview from '../../components/MediaPreview';

export default {
  title: 'Components/Preview',
  argTypes: {
    type: {options: ['twitter-tweet'], control: 'select'}
  },
  component: MediaPreview
} as ComponentMeta<typeof MediaPreview>;

const Template: ComponentStory<typeof MediaPreview> = args => {
  return (
    <Layout mode="annotation">
      <MainColumn>
        <MediaPreview {...args} />
      </MainColumn>
    </Layout>
  );
};

export const Twitter = Template.bind({});
Twitter.args = {
  type: 'twitter-tweet',
  value: 'https://twitter.com/medialab_ScPo/status/1583391821539213314'
};
