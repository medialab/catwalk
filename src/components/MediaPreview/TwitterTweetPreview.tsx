import {TwitterEmbed} from 'react-social-media-embed';

import type {InternationalizedString} from '../../../i18n/';
import type {PreviewComponentProps} from './types';

export const label: InternationalizedString = 'mediatypeLabelTwitterTweet';

export function canPreview(value: string) {
  // TODO: improve this heuristic
  return value.includes('twitter.com');
}

function TwitterTweetPreview({value}: PreviewComponentProps) {
  return <TwitterEmbed url={value} />;
}

export const Component = TwitterTweetPreview;
