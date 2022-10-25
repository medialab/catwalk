import {TwitterEmbed} from 'react-social-media-embed';

export const label = 'mediatypeLabelTwitterTweet';

export function canPreview(value: string) {
  // TODO: improve this heuristic
  return value.trim().startsWith('https://twitter.com/');
}

function TwitterTweetPreview({value}) {
  return <TwitterEmbed url={value.trim()} />;
}

export const Component = TwitterTweetPreview;
