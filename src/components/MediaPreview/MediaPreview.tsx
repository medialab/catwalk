import Select from 'react-select';

import type {MediaPreviewType} from '../../types';
import {useI18nMessages} from '../../hooks';
import Notification from '../Notification';

import * as twitterTweet from './TwitterTweetPreview';

interface MediaPreviewSpecification {
  label: string;
  canPreview: (value: string) => boolean;
  Component: React.FC<{value: string}>;
}

const PREVIEW_MAP: Record<MediaPreviewType, MediaPreviewSpecification> = {
  'twitter-tweet': twitterTweet
};

interface MediaPreviewProps {
  type?: MediaPreviewType;
  value: string;
  onPreviewTypeChange?: (type: string) => void;
}

/**
 * Media preview general component
 */
function MediaPreview({
  type = 'twitter-tweet',
  value,
  onPreviewTypeChange
}: MediaPreviewProps) {
  const {
    mediapreviewCantPreview,
    mediapreviewChooseAType,
    mediapreviewChooseATypePlaceholder,
    ...i18nMessages
  } = useI18nMessages();

  /**
   * Note: preview options labels are language-dependent,
   * so they are put in the component function body
   */
  const PREVIEW_OPTIONS = Object.keys(PREVIEW_MAP).map(type => {
    return {value: type, label: i18nMessages[PREVIEW_MAP[type].label]};
  });

  const selectedOption = PREVIEW_OPTIONS.find(option => option.value === type);
  const {canPreview, Component: PreviewComponent} = PREVIEW_MAP[type];

  return (
    <main className="MediaPreview">
      <div className="type-choice-container">
        <div>{mediapreviewChooseAType}</div>
        <div>
          <Select
            onChange={e => onPreviewTypeChange(e.value)}
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
