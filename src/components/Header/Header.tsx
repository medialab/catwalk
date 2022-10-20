import { useI18nMessages } from "../../hooks";

function Header() {
  const {tagline} = useI18nMessages();
  return (
    <header className="Header">
      <h1>Catwalk</h1>
      <h2>{tagline}</h2>
    </header>
  );
}

export default Header;
