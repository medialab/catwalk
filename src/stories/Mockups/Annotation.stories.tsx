import {ComponentStory, ComponentMeta} from '@storybook/react';

import {
  mockAnnotationModel,
  mockAnnotationStats,
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
const Template: ComponentStory<typeof Layout> = args => {
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
        type="twitter_tweet"
        data={{
          url: 'https://twitter.com/robindemourat/status/1580220856965693441'
        }}
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
      data={annotatedTweets20}
      navKeyBindings={mockAnnotationModel.options.navKeyBindings}
      sortOrder={mockAnnotationModel.options.sortOrder}
      schema={mockAnnotationModel.schema}
      // controlled state
      isEdited={isEdited}
      isRefreshable={isRefreshable}
      keyAssignIsEdited={editedKeyAssignCommand !== undefined}
      editedKeyAssignCommand={editedKeyAssignCommand}
      activeObjectIndex={0}
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
      model={mockAnnotationModel}
      isEdited={isEdited}
      uploadedModelStatus={uploadedModelStatus}
      stats={mockAnnotationStats}
      onModelFilesDrop={console.log}
      onEditTogglePrompt={console.log}
      onNewCategorizationPrompt={console.log}
      onDeleteCategoryRequest={console.log}
    />
  );
};

type MockDownloadFooterProps = {
  hasModalOpen?: boolean;
};
const MockDownloadFooter = ({hasModalOpen}: MockDownloadFooterProps) => {
  return (
    <DownloadFooter
      hasModalOpen={hasModalOpen}
      onModalOpen={console.log}
      onModalClose={console.log}
      onDownloadChoice={console.log}
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
        <MockDownloadFooter />
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
        <MockDownloadFooter />
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
        <MockDownloadFooter />
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
        <MockDownloadFooter />
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
        <MockDownloadFooter />
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
        <MockDownloadFooter />
      </MainColumn>
      <MockTagsColumn />
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
        <MockDownloadFooter hasModalOpen />
      </MainColumn>
      <MockTagsColumn />
    </>
  )
};
