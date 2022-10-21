import {TwitterEmbed} from 'react-social-media-embed';
import Select from 'react-select';

import {useI18nMessages} from '../../hooks';
import Notification from '../Notification';

/**
 * Checks whether a given data can be previewed with a certain type.
 * Returns a boolean specifying if data is sufficient to preview a certain type
 */
function canPreview({type, data}) {
  switch (type) {
    case 'twitter_tweet':
      return data?.url !== undefined;
    default:
      return false;
  }
}

/**
 * React component that orchestrates media object preview
 */
function ObjectPreview({type, data}) {
  switch (type) {
    case 'twitter_tweet':
      return <TwitterEmbed url={data?.url} />;
    default:
      return <div>Unable to preview</div>;
  }
}

/**
 * Media preview general component
 */
function MediaPreview({type, data, onPreviewTypeChange}) {
  const {
    mediapreviewCantPreview,
    mediapreviewChooseAType,
    mediapreviewChooseATypePlaceholder,
    mediatypeLabelTwitterTweet,
    mediatypeLabelYoutubeVideo,
    mediatypeLabelWebsiteIframe
  } = useI18nMessages();

  /**
   * Note: preview options labels are language-dependent,
   * so they are put in the component function body
   */
  const PREVIEW_OPTIONS = [
    {value: 'twitter_tweet', label: mediatypeLabelTwitterTweet},
    {value: 'youtube_video', label: mediatypeLabelYoutubeVideo},
    {value: 'website_iframe', label: mediatypeLabelWebsiteIframe}
  ];
  const selectedOption =
    type !== undefined && PREVIEW_OPTIONS.find(({value}) => value === type);
  return (
    <main className="MediaPreview">
      <div className="type-choice-container">
        <div>{mediapreviewChooseAType}</div>
        <div>
          <Select
            onChange={onPreviewTypeChange}
            options={PREVIEW_OPTIONS}
            isSearchable={false}
            value={selectedOption}
            placeholder={mediapreviewChooseATypePlaceholder}
          />
        </div>
      </div>
      <div className="object-preview-container">
        {canPreview({type, data}) ? (
          <ObjectPreview type={type} data={data} />
        ) : (
          <Notification isType="error">{mediapreviewCantPreview}</Notification>
        )}
      </div>
    </main>
  );
}

export default MediaPreview;
