import Select from 'react-select';

import type {MediaPreviewType, CSVRow} from '../../types';
import {DEFAULT_MEDIA_PREVIEW_TYPE} from '../../defaults';
import {useI18nMessages} from '../../hooks';
import Notification from '../Notification';

import * as twitterTweet from './TwitterTweetPreview';
import * as youtubeVideo from './YoutubeVideoPreview';
import * as websiteIFrame from './WebsiteIframePreview';
import * as image from './ImagePreview';

interface MediaPreviewSpecification {
  label: string;
  canPreview: (value: string) => boolean;
  Component: React.FC<{value: string}>;
}

const PREVIEW_MAP: Record<MediaPreviewType, MediaPreviewSpecification> = {
  'twitter-tweet': twitterTweet,
  'youtube-video': youtubeVideo,
  'website-iframe': websiteIFrame,
  image: image
};

interface MediaPreviewProps {
  type?: MediaPreviewType;
  selectedColumn: string;
  row: CSVRow;
  rowIndex?: number;
  onPreviewTypeChange?: (type: MediaPreviewType) => void;
}

/**
 * Media preview general component
 */
function MediaPreview({
  type = DEFAULT_MEDIA_PREVIEW_TYPE,
  selectedColumn,
  row,
  rowIndex,
  onPreviewTypeChange
}: MediaPreviewProps) {
  const i18nMessages = useI18nMessages();

  const {
    mediapreviewCantPreview,
    mediapreviewChooseAType,
    mediapreviewChooseATypePlaceholder
  } = i18nMessages;

  /**
   * Note: preview options labels are language-dependent,
   * so they are put in the component function body
   */
  const PREVIEW_OPTIONS = Object.keys(PREVIEW_MAP).map(type => {
    return {value: type, label: i18nMessages[PREVIEW_MAP[type].label]};
  });

  const selectedOption = PREVIEW_OPTIONS.find(option => option.value === type);
  const {canPreview, Component: PreviewComponent} = PREVIEW_MAP[type];

  const value = row[selectedColumn];

  return (
    <main className="MediaPreview">
      <div className="type-choice-container">
        <div>{mediapreviewChooseAType}</div>
        <div>
          <Select
            menuPlacement="auto"
            onChange={e => e && onPreviewTypeChange?.(e.value)}
            options={PREVIEW_OPTIONS}
            isSearchable={false}
            value={selectedOption}
            placeholder={mediapreviewChooseATypePlaceholder}
          />
        </div>
      </div>
      <div className="object-preview-container">
        {canPreview(value) ? (
          <PreviewComponent value={value} />
        ) : (
          <Notification isType="error">{mediapreviewCantPreview}</Notification>
        )}
      </div>
    </main>
  );
}

export default MediaPreview;
