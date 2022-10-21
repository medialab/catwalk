import {useI18nMessages} from '../../hooks';

function Footer() {
  const {footerHtml} = useI18nMessages();
  return (
    <footer className="Footer">
      <p
        dangerouslySetInnerHTML={{
          __html: footerHtml
        }}
      />
    </footer>
  );
}

export default Footer;
