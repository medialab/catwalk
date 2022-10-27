import {ComponentMeta, ComponentStory} from '@storybook/react';

import Layout from '../../components/Layout/Layout';
import MainColumn from '../../components/Layout/MainColumn';
import MediaPreview from '../../components/MediaPreview';

export default {
  title: 'Components/Preview',
  argTypes: {
    type: {
      options: ['twitter-tweet', 'youtube-video', 'website-iframe'],
      control: 'select'
    }
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

export const Youtube = Template.bind({});
Youtube.args = {
  type: 'youtube-video',
  value: 'https://www.youtube.com/embed/QnmJEHjPuIU'
  /*   value: 'https://www.youtube.com/watch?v=QnmJEHjPuIU&ab_channel=BFMTV'
   */
};

export const Website = Template.bind({});
Website.args = {
  type: 'website-iframe',
  value:
    'https://www.humanite.fr/politique/yannick-jadot/yannick-jadot-se-pose-en-rempart-contre-les-lobbies-743679#xtor=RSS-1'
};
