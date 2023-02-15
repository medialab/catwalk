import type {PreviewSpecification} from './types';

const websiteIframePreviewSpecs: PreviewSpecification<string> = {
  label: 'mediatypeLabelWebsiteIframe',
  parse(value) {
    return value;
  },
  Component({value}) {
    return (
      <div>
        <p>
          <a href={value}>{value}</a>
        </p>
        <iframe
          src={value}
          width="100%"
          height="800"
          sandbox="allow-same-origin"></iframe>
      </div>
    );
  }
};

export default websiteIframePreviewSpecs;
