import {ComponentStory, ComponentMeta} from '@storybook/react';

import Dropzone from '../../components/Dropzone';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout/Container';
import MainColumn from '../../components/Layout/MainColumn';
import Notification from '../../components/Notification';
import SamplePicker from '../../components/SamplePicker/SamplePicker';

const mockSamplesOptions = [
  {value: 'tweets', label: 'tweets'},
  {value: 'youtubeVideos', label: 'youtube videos'},
  {value: 'websites', label: 'websites'}
];

const mockIntroText = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quibusdam amet voluptatem eius dolorum reprehenderit earum. Quis, dolorum cum in vel laudantium adipisci, beatae accusamus voluptatibus quos tenetur explicabo expedita.
`;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Mockups/Landing',
  component: Layout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'}
  }
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = args => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  mode: 'landing',
  children: (
    <MainColumn>
      <Header />
      <p>{mockIntroText}</p>
      <Dropzone onFilesDrop={console.log} />
      <SamplePicker onChange={console.log} options={mockSamplesOptions} />
      <Footer />
    </MainColumn>
  )
};

export const InvalidFile = Template.bind({});
InvalidFile.args = {
  mode: 'landing',
  children: (
    <MainColumn>
      <Header />
      <p>{mockIntroText}</p>
      <Dropzone onFilesDrop={console.log} />
      <Notification>Invalid file ! try again !</Notification>
      <SamplePicker onChange={console.log} options={mockSamplesOptions} />
      <Footer />
    </MainColumn>
  )
};

export const LoadingFile = Template.bind({});
LoadingFile.args = {
  mode: 'landing',
  children: (
    <MainColumn>
      <Header />
      <p>{mockIntroText}</p>
      <Dropzone onFilesDrop={console.log} />
      <SamplePicker onChange={console.log} options={mockSamplesOptions} />
      <Footer />
    </MainColumn>
  )
};
