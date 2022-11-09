import Button from '../Button';
import {useI18nMessages} from '../../hooks';

interface DownloadFooterProps {
  onClick?: () => void;
}

function DownloadFooter({onClick}: DownloadFooterProps) {
  const {downloadFooterDownload} = useI18nMessages();

  return (
    <>
      <footer className="DownloadFooter">
        <Button isFullWidth onClick={onClick}>
          {downloadFooterDownload}
        </Button>
      </footer>
    </>
  );
}

export default DownloadFooter;
