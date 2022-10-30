import {TwitterEmbed} from 'react-social-media-embed';

import type {PreviewSpecification} from './types';

const twitterTweetPreviewSpecs: PreviewSpecification<string> = {
  label: 'mediatypeLabelTwitterTweet',
  parse(value) {
    if (!value.includes('twitter.com')) return null;

    return value;
  },
  Component({value}) {
    return <TwitterEmbed url={value} />;
  }
};

export default twitterTweetPreviewSpecs;
