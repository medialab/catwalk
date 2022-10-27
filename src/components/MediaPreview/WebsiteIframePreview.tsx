import type {InternationalizedString} from '../../../i18n';
import type {PreviewComponentProps} from './types';

export const label: InternationalizedString = 'mediatypeLabelWebsiteIframe';

export function canPreview(value: string) {
  // TODO: improve this heuristic
  return true;
}

function WebsiteIframePreview({value}: PreviewComponentProps) {
  return (
    <iframe
      src={value}
      width="100%"
      height="300"
      sandbox="allow-same-origin"></iframe>
  );
}

export const Component = WebsiteIframePreview;
