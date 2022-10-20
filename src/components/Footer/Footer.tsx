import { useI18nMessages } from "../../hooks";

function Footer() {

  const {
    footer_html
  } = useI18nMessages();
  return (
    <footer className="Footer">
      <p
        dangerouslySetInnerHTML={{
          __html: footer_html
        }}
      />
    </footer>
  );
}

export default Footer;
