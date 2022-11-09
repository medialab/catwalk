import type {PreviewSpecification} from './types';

const imagePreviewSpecs: PreviewSpecification<string> = {
  label: 'mediatypeLabelImage',
  parse(value) {
    return value;
  },
  Component({value}) {
    return <img src={value} width="100%" />;
  }
};

export default imagePreviewSpecs;
