import {YouTubeEmbed} from 'react-social-media-embed';

import type {PreviewSpecification} from './types';

function isVideoId(value: string): boolean {
  const videoIdRe = /^[a-zA-Z0-9_-]{11}$/;

  return value.match(videoIdRe) ? true : false;
}

function extractYoutubeVideoId(value: string): string | null {
  const videoUrlRe =
    /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

  if (isVideoId(value)) {
    return value;
  }

  const match = value.match(videoUrlRe);

  return match && match[1] && isVideoId(match[1]) ? match[1] : null;
}

const youtubeVideoSpecs: PreviewSpecification<string> = {
  label: 'mediatypeLabelYoutubeVideo',
  parse(value) {
    return extractYoutubeVideoId(value) ? value : null;
  },
  Component({value}) {
    return (
      <YouTubeEmbed
        url={'http://www.youtube.com/watch?v=' + extractYoutubeVideoId(value)}
        width="100%"
      />
    );
  }
};

export default youtubeVideoSpecs;
