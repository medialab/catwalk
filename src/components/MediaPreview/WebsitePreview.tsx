export const label = 'mediatypeLabelWebsiteIframe';

export function canPreview(value: string) {
  // TODO: improve this heuristic
  return value.trim().startsWith('http') || value.trim().startsWith('www');
}

function WebsitePreview({value}) {
  return <iframe src={value.trim()}></iframe>;
}

export const Component = WebsitePreview;
