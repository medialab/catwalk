import {ComponentStory, ComponentMeta} from '@storybook/react';

import {useI18nMessages} from '../../hooks';

import Dropzone from '../../components/Dropzone';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout/Layout';
import MainColumn from '../../components/Layout/MainColumn';
import Notification from '../../components/Notification';
import SamplePicker from '../../components/SamplePicker/SamplePicker';
import LoadingCartel from '../../components/LoadingCartel';
import MainRow from '../../components/Layout/MainRow';

const mockSamplesOptions = [
  {value: 'tweets', label: 'tweets'},
  {value: 'youtubeVideos', label: 'youtube videos'},
  {value: 'websites', label: 'websites'}
];

const mockIntroText = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quibusdam amet voluptatem eius dolorum reprehenderit earum. Quis, dolorum cum in vel laudantium adipisci, beatae accusamus voluptatibus quos tenetur explicabo expedita.
`;
function ParagraphIntroduction() {
  const {introductionText} = useI18nMessages();
  return <p>{introductionText}</p>;
}

function NotificationInvalidFile() {
  const {notifInvalidFile} = useI18nMessages();
  return <Notification>{notifInvalidFile}</Notification>;
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Mockups/1 - Landing',
  component: Layout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'}
  }
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = args => {
  return <Layout mode="landing" {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: (
    <MainColumn>
      <MainRow>
        <Header />
        <p>{mockIntroText}</p>
        <Dropzone onFilesDrop={console.log} />
        <SamplePicker onChange={console.log} options={mockSamplesOptions} />
      </MainRow>
      <Footer />
    </MainColumn>
  )
};

export const InvalidFile = Template.bind({});
InvalidFile.args = {
  children: (
    <MainColumn>
      <MainRow>
        <Header />
        <ParagraphIntroduction />
        <Dropzone onFilesDrop={console.log} />
        <NotificationInvalidFile />
        <SamplePicker onChange={console.log} options={mockSamplesOptions} />
      </MainRow>
      <Footer />
    </MainColumn>
  )
};

export const LoadingFile = Template.bind({});
LoadingFile.args = {
  children: (
    <MainColumn>
      <MainRow>
        <Header />
        <ParagraphIntroduction />
        <LoadingCartel loadingPercentage={50} />
      </MainRow>
      <Footer />
    </MainColumn>
  )
};
