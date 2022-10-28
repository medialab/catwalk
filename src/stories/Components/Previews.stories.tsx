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
  value: 'https://twitter.com/medialab_ScPo/status/1583391821539213314'
};

export const Youtube = Template.bind({});
Youtube.args = {
  type: 'youtube-video',
  value: 'https://youtu.be/QnmJEHjPuIU'
  /*   value: 'QnmJEHjPuIU'
   */
};

export const Website = Template.bind({});
Website.args = {
  type: 'website-iframe',
  value:
    'https://www.humanite.fr/politique/yannick-jadot/yannick-jadot-se-pose-en-rempart-contre-les-lobbies-743679#xtor=RSS-1'
};

export const Image = Template.bind({});
Image.args = {
  type: 'image',
  value:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Merseburg%2C_Schloss_--_1980_--_4.jpg/800px-Merseburg%2C_Schloss_--_1980_--_4.jpg'
};
