// TODO: use YouTubeEmbed
/* import {YouTubeEmbed} from 'react-social-media-embed';
 */
export const label = 'mediatypeLabelYoutubeVideo';

export function canPreview(value: string) {
  // TODO: improve this heuristic
  return (
    value.trim().startsWith('https://www.youtube.com/') ||
    value.trim().startsWith('https://youtu.be')
  );
}

function YoutubeVideoPreview({value}) {
  return (
    <iframe
      src={value.trim()}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
  );
  /*   return <YouTubeEmbed url={value.trim()} />;
   */
}

export const Component = YoutubeVideoPreview;
