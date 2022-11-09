import {ComponentMeta, ComponentStory} from '@storybook/react';

import Layout from '../../components/Layout/Layout';
import MainColumn from '../../components/Layout/MainColumn';
import MediaPreview from '../../components/MediaPreview';

export default {
  title: 'Components/Preview',
  argTypes: {
    type: {
      options: ['twitter-tweet', 'youtube-video', 'website-iframe', 'image'],
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
  row: {
    url: 'https://twitter.com/medialab_ScPo/status/1583391821539213314'
  },
  selectedColumn: 'url'
};

export const Youtube = Template.bind({});
Youtube.args = {
  type: 'youtube-video',
  row: {url: 'https://youtu.be/QnmJEHjPuIU'},
  selectedColumn: 'url'
};

export const Website = Template.bind({});
Website.args = {
  type: 'website-iframe',
  row: {
    url: 'https://www.humanite.fr/politique/yannick-jadot/yannick-jadot-se-pose-en-rempart-contre-les-lobbies-743679#xtor=RSS-1'
  },
  selectedColumn: 'url'
};

export const Image = Template.bind({});
Image.args = {
  type: 'image',
  row: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Merseburg%2C_Schloss_--_1980_--_4.jpg/800px-Merseburg%2C_Schloss_--_1980_--_4.jpg'
  },
  selectedColumn: 'url'
};
