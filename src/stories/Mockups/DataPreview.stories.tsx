import {ComponentStory, ComponentMeta} from '@storybook/react';

import {useI18nMessages} from '../../hooks';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout/Container';
import MainColumn from '../../components/Layout/MainColumn';
import TablePreview from '../../components/TablePreview';
import InfoPin from '../../components/InfoPin';
import MediaPreview from '../../components/MediaPreview';
import Button from '../../components/Button';
import MainRow from '../../components/Layout/MainRow';

function ColumnSelectionPrompt() {
  const {previewSelectColumnPrompt, previewSelectColumnPromptExplanation} =
    useI18nMessages();

  return (
    <p>
      <span>{previewSelectColumnPrompt}</span>
      <InfoPin message={previewSelectColumnPromptExplanation} />
    </p>
  );
}

function ValidationButton() {
  const {previewValidation} = useI18nMessages();

  return <Button isFullWidth>{previewValidation}</Button>;
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Mockups/2 - Data preparation',
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

const mockColumns = ['tata', 'titi', 'toto'];
const mockData = [
  {
    tata: 'Jean-François',
    titi: 'Jean-Michel',
    toto: 'Jean-Louis'
  },
  {
    tata: 'Cunégonde',
    titi: 'Martingale',
    toto: 'Firmanine'
  }
];

export const Default = Template.bind({});
Default.args = {
  children: (
    <MainColumn>
      <MainRow>
        <Header allowBackLink onBackLinkClick={console.log} />
        <TablePreview columns={mockColumns} data={mockData} />
        <ColumnSelectionPrompt />
      </MainRow>
      <Footer />
    </MainColumn>
  )
};
export const ColumnSelected = Template.bind({});
ColumnSelected.args = {
  children: (
    <MainColumn>
      <MainRow>
        <Header allowBackLink onBackLinkClick={console.log} />
        <TablePreview
          columns={mockColumns}
          data={mockData}
          selectedColumnId={'titi'}
        />
        <ColumnSelectionPrompt />

        <MediaPreview
          type="twitter_tweet"
          data={{
            url: 'https://twitter.com/robindemourat/status/1580220856965693441'
          }}
          onPreviewTypeChange={console.log}
        />
        <ValidationButton />
      </MainRow>
      <Footer />
    </MainColumn>
  )
};
export const InvalidPreview = Template.bind({});
InvalidPreview.args = {
  children: (
    <MainColumn>
      <MainRow>
        <Header allowBackLink onBackLinkClick={console.log} />
        <TablePreview
          columns={mockColumns}
          data={mockData}
          selectedColumnId={'titi'}
        />
        <ColumnSelectionPrompt />

        <MediaPreview
          type="twitter_tweet"
          data={{
            michel: 'mmichel'
          }}
          onPreviewTypeChange={console.log}
        />
        <ValidationButton />
      </MainRow>
      <Footer />
    </MainColumn>
  )
};
