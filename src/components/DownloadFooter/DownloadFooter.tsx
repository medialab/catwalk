import {useI18nMessages} from '../../hooks';
import Button from '../Button';
import InfoPin from '../InfoPin';
import Modal from '../Modal';

type DowloadType = 'everything' | 'data' | 'model';

type DownloadFooterProps = {
  hasModalOpen?: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  onDownloadChoice: (type: DowloadType) => void;
};

function DownloadFooter({
  hasModalOpen = false,
  onModalOpen,
  onModalClose,
  onDownloadChoice
}: DownloadFooterProps) {
  const {
    downloadFooterDownload,
    downloadFooterModalTitle,
    downloadFooterModalDlData,
    downloadFooterModalDlDataHelp,
    downloadFooterModalDlModel,
    downloadFooterModalDlModelHelp,
    downloadFooterModalDlEverything,
    downloadFooterModalDlEverythingHelp,
    modalCancel
  } = useI18nMessages();

  return (
    <>
      <footer className="DownloadFooter">
        <Button isFullWidth onClick={onModalOpen}>
          {downloadFooterDownload}
        </Button>
      </footer>
      <Modal isOpen={hasModalOpen} onClose={onModalClose}>
        <div className="DownloadFooterModalContent">
          <h3>{downloadFooterModalTitle}</h3>
          <ul>
            <li>
              <Button onClick={() => onDownloadChoice('data')}>
                <span>{downloadFooterModalDlData}</span>
                <InfoPin message={downloadFooterModalDlDataHelp} />
              </Button>
            </li>
            <li>
              <Button onClick={() => onDownloadChoice('model')}>
                <span>{downloadFooterModalDlModel}</span>
                <InfoPin message={downloadFooterModalDlModelHelp} />
              </Button>
            </li>
            <li>
              <Button onClick={() => onDownloadChoice('everything')}>
                <span>{downloadFooterModalDlEverything}</span>
                <InfoPin message={downloadFooterModalDlEverythingHelp} />
              </Button>
            </li>
            <li>
              <Button onClick={() => onModalClose}>{modalCancel}</Button>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default DownloadFooter;
