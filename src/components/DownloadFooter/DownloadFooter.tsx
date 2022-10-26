import Button from '../Button';
import {useI18nMessages, useDisplayModal} from '../../hooks';

function DownloadFooter() {
  const {downloadFooterDownload} = useI18nMessages();
  const displayModal = useDisplayModal();

  return (
    <>
      <footer className="DownloadFooter">
        <Button isFullWidth onClick={() => displayModal('download')}>
          {downloadFooterDownload}
        </Button>
      </footer>
    </>
  );
}

export default DownloadFooter;
