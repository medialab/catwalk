// TODO: use YouTubeEmbed
/* import {YouTubeEmbed} from 'react-social-media-embed';
 */
export const label = 'mediatypeLabelYoutubeVideo';

export function canPreview(value: URL) {
  return value.hostname === 'youtu.be' || value.hostname === 'www.youtube.com';
}

function YoutubeVideoPreview({value}) {
  if (value.pathname.startsWith('/embed')) {
    return (
      <iframe
        src={value.href}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        width="100%"
        height="300"></iframe>
    );
  } /* else {
    const response = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=QnmJEHjPuIU&ab_channel=BFMTV&format=json")
    .then(response => response.json())
    .then(data => data.html)
    console.log(response)
    return response

  }; */

  /*   return <YouTubeEmbed url={value} />;
   */
}

export const Component = YoutubeVideoPreview;
