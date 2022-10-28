import {ComponentStory, ComponentMeta} from '@storybook/react';

import {
  mockAnnotationConfig,
  mockAnnotationStats,
  mockAnnotationTotal,
  generateMockAnnotatedTweets
} from './mockData';

import Header from '../../components/Header';
import Layout from '../../components/Layout/Layout';
import MainColumn from '../../components/Layout/MainColumn';
import MediaPreview from '../../components/MediaPreview';
import MainRow from '../../components/Layout/MainRow';
import DownloadFooter from '../../components/DownloadFooter';
import TagsColumn from '../../components/TagsColumn';
import Railway from '../../components/Railway';
import DownloadModal from '../../components/Modals/DownloadModal';
import {RailwayNavKeyEditModal} from '../../components/Modals/KeyEditModal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Mockups/3 - Annotation',
  component: Layout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'}
  }
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = ({mode, ...args}) => {
  return <Layout mode="annotation" {...args} />;
};

const annotatedTweets20 = generateMockAnnotatedTweets(100);

/**
 * Wrapping main row code as it does not change between stories
 */
const MockMainRow = () => {
  return (
    <MainRow>
      <Header allowBackLink onBackLinkClick={console.log} />
      <MediaPreview
        type="twitter-tweet"
        value="https://twitter.com/robindemourat/status/1580220856965693441"
        onPreviewTypeChange={console.log}
      />
    </MainRow>
  );
};
interface MockRailwayProps {
  isEdited?: boolean;
  isRefreshable?: boolean;
  editedKeyAssignCommand?: 'next' | 'prev';
}
/**
 * Wrapper for the railway component in order to tweak only story-dependent props
 */
const MockRailway = ({
  isEdited,
  isRefreshable,
  editedKeyAssignCommand
}: MockRailwayProps) => {
  return (
    <Railway
      // data & model
      rows={annotatedTweets20}
      navKeyBindings={mockAnnotationConfig.options.navKeyBindings}
      sortOrder={mockAnnotationConfig.options.sortOrder}
      schema={mockAnnotationConfig.schema}
      // controlled state
      isEdited={isEdited}
      isRefreshable={isRefreshable}
      keyAssignIsEdited={editedKeyAssignCommand !== undefined}
      editedKeyAssignCommand={editedKeyAssignCommand}
      activeRowIndex={0}
      // callbacks
      onEditOpenPrompt={console.log}
      onEditClosePrompt={console.log}
      onNavKeyAssignOpenPrompt={console.log}
      onNavKeyAssignClosePrompt={console.log}
      onRefreshSort={console.log}
      onNavKeyAssignChoice={console.log}
      onSortOrderChange={console.log}
      onNavToSibling={console.log}
      onNavToIndex={console.log}
    />
  );
};

interface MockTagsColumnProps {
  isEdited?: boolean;
  uploadedModelStatus?: 'error' | 'pending' | 'processing';
}

const MockTagsColumn = ({
  isEdited,
  uploadedModelStatus
}: MockTagsColumnProps) => {
  return (
    <TagsColumn
      schema={mockAnnotationConfig.schema}
      isEdited={!!isEdited}
      uploadedModelStatus={uploadedModelStatus}
      stats={mockAnnotationStats}
      total={mockAnnotationTotal}
      onModelFilesDrop={console.log}
      onEditTogglePrompt={console.log}
      onNewCategorizationPrompt={console.log}
      onDeleteCategoryRequest={console.log}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <MockRailway />
      <MainColumn>
        <MockMainRow />
        <DownloadFooter />
      </MainColumn>
      <MockTagsColumn />
    </>
  )
};

export const ModelIsEdited = Template.bind({});
ModelIsEdited.args = {
  children: (
    <>
      <MockRailway />
      <MainColumn>
        <MockMainRow />
        <DownloadFooter />
      </MainColumn>
      <MockTagsColumn isEdited />
    </>
  )
};

export const ModelHasBeenUploadedButIsInvalid = Template.bind({});
ModelHasBeenUploadedButIsInvalid.args = {
  children: (
    <>
      <MockRailway />
      <MainColumn>
        <MockMainRow />
        <DownloadFooter />
      </MainColumn>
      <MockTagsColumn isEdited uploadedModelStatus="error" />
    </>
  )
};

export const RailwayIsRefreshable = Template.bind({});
RailwayIsRefreshable.args = {
  children: (
    <>
      <MockRailway isRefreshable />
      <MainColumn>
        <MockMainRow />
        <DownloadFooter />
      </MainColumn>
      <MockTagsColumn />
    </>
  )
};

export const RailwayIsEdited = Template.bind({});
RailwayIsEdited.args = {
  children: (
    <>
      <MockRailway isEdited />
      <MainColumn>
        <MockMainRow />
        <DownloadFooter />
      </MainColumn>
      <MockTagsColumn />
    </>
  )
};

export const RailwayANavKeyIsEdited = Template.bind({});
RailwayANavKeyIsEdited.args = {
  children: (
    <>
      <MockRailway isEdited editedKeyAssignCommand="prev" />
      <MainColumn>
        <MockMainRow />
        <DownloadFooter />
      </MainColumn>
      <MockTagsColumn />
      <RailwayNavKeyEditModal binding="prev" />
    </>
  )
};

export const DownloadModalIsOpen = Template.bind({});
DownloadModalIsOpen.args = {
  children: (
    <>
      <MockRailway />
      <MainColumn>
        <MockMainRow />
        <DownloadFooter />
      </MainColumn>
      <MockTagsColumn />
      <DownloadModal />
    </>
  )
};
