// TODO: use YouTubeEmbed
/* import {YouTubeEmbed} from 'react-social-media-embed';
 */
import type {InternationalizedString} from '../../../i18n';
import type {PreviewComponentProps} from './types';

export const label: InternationalizedString = 'mediatypeLabelYoutubeVideo';

export function canPreview(value: string) {
  const url = new URL(value);

  return url.hostname === 'youtu.be' || url.hostname === 'www.youtube.com';
}

function YoutubeVideoPreview({value}: PreviewComponentProps) {
  const url = new URL(value);

  if (url.pathname.startsWith('/embed')) {
    return (
      <iframe
        src={url.href}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        width="100%"
        height="300"></iframe>
    );
  } else {
    /*     const response = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=QnmJEHjPuIU&ab_channel=BFMTV&format=json")
    .then(response => response.json())
    .then(data => data.html)
    console.log(response)
    return response */
    return (
      <iframe
        src={url.href}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        width="100%"
        height="300"></iframe>
    );
  }

  /*   return <YouTubeEmbed url={value} />;
   */
}

export const Component = YoutubeVideoPreview;
