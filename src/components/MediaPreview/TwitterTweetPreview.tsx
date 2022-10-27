import {TwitterEmbed} from 'react-social-media-embed';

export const label = 'mediatypeLabelTwitterTweet';

export function canPreview(value: URL) {
  // TODO: improve this heuristic
  return true;
}

function TwitterTweetPreview({value}) {
  return <TwitterEmbed url={value.href} />;
}

export const Component = TwitterTweetPreview;
