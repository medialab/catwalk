import {useI18nMessages} from '../../hooks';

interface HeaderProps {
  allowBackLink?: boolean;
  onBackLinkClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function Header({allowBackLink = false, onBackLinkClick}: HeaderProps) {
  const {tagline, headerBacklink} = useI18nMessages();
  return (
    <header className="Header">
      <h1>Catwalk</h1>

      <h2>{tagline}</h2>
      {allowBackLink ? (
        <div className="backlink_btn" onClick={onBackLinkClick}>
          {headerBacklink}
        </div>
      ) : null}
    </header>
  );
}

export default Header;
