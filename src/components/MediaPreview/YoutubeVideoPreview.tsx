import {YouTubeEmbed} from 'react-social-media-embed';

import type {InternationalizedString} from '../../../i18n';
import type {PreviewComponentProps} from './types';

export const label: InternationalizedString = 'mediatypeLabelYoutubeVideo';

function isVideoId(value: string) {
  const videoIdRe = /^[a-zA-Z0-9_-]{11}$/;

  return value.match(videoIdRe) ? true : false;
}

function extractYoutubeVideoId(value: string) {
  const videoUrlRe =
    /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

  if (isVideoId(value)) {
    return value;
  }

  const match = value.match(videoUrlRe);

  return match && match[1] && isVideoId(match[1]) ? match[1] : false;
}

export function canPreview(value: string) {
  return extractYoutubeVideoId(value) ? true : false;
}

function YoutubeVideoPreview({value}: PreviewComponentProps) {
  return (
    <YouTubeEmbed
      url={'http://www.youtube.com/watch?v=' + extractYoutubeVideoId(value)}
      width="100%"
    />
  );
}

export const Component = YoutubeVideoPreview;
