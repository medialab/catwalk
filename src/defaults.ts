import type {View, MediaPreviewType, AnnotationSortOrder} from './types';

export const DEFAULT_VIEW: View = 'landing';
export const DEFAULT_MEDIA_PREVIEW_TYPE: MediaPreviewType = 'debug';
export const DEFAULT_ANNOTATION_SORT_ORDER: AnnotationSortOrder = 'table';
export const DEFAULT_CATEGORIZATION_NAME = 'Status';
export const DEFAULT_CATEGORIZATION_COLOR = 'cyan';

export const DEFAULT_SAMPLES = [
  {
    value: '/public/samples/tweets_medialab.csv',
    label: 'tweets'
  },
  {
    value: '/public/samples/yt_french_presidential_election_2022.csv',
    label: 'youtube videos'
  },
  {
    value: '/public/samples/images_german_castles_in_1980.csv',
    label: 'photos'
  },
  {
    value: '/public/samples/french_news_sample.csv',
    label: 'websites'
  }
];
