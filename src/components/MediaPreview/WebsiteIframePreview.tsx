import type {InternationalizedString} from '../../../i18n';
import type {PreviewComponentProps} from './types';

export const label: InternationalizedString = 'mediatypeLabelWebsiteIframe';

export function canPreview(value: string) {
  // TODO: improve this heuristic
  return true;
}

function WebsiteIframePreview({value}: PreviewComponentProps) {
  return (
    <div>
      <p>
        <a href={value}>{value}</a>
      </p>
      <iframe
        src={value}
        width="100%"
        height="300"
        sandbox="allow-same-origin"></iframe>
    </div>
  );
}

export const Component = WebsiteIframePreview;
