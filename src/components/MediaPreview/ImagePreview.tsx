import type {InternationalizedString} from '../../../i18n';
import type {PreviewComponentProps} from './types';

export const label: InternationalizedString = 'mediatypeLabelImage';

export function canPreview(value: string) {
  // TODO: improve this heuristic
  return true;
}

function ImagePreview({value}: PreviewComponentProps) {
  return <img src={value} width="100%" />;
}

export const Component = ImagePreview;
