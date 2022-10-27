export const label = 'mediatypeLabelWebsiteIframe';

export function canPreview(value: URL) {
  // TODO: improve this heuristic
  return true;
}

function WebsitePreview({value}) {
  return (
    <iframe
      src={value.href}
      width="100%"
      height="300"
      sandbox="allow-same-origin"></iframe>
  );
}

export const Component = WebsitePreview;
