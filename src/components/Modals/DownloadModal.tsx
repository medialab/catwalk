import type {DownloadType} from '../../types';
import Modal, {ModalPropsBase} from './Modal';
import Button from '../Button';
import InfoPin from '../InfoPin';
import {useI18nMessages} from '../../hooks';

interface DownloadModalProps extends ModalPropsBase {
  onDownloadChoice?: (type: DownloadType) => void;
}

export default function DownloadModal({
  isOpen,
  onClose,
  onDownloadChoice
}: DownloadModalProps) {
  const {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="DownloadFooterModalContent">
        <h3>{downloadFooterModalTitle}</h3>
        <ul>
          <li>
            <Button onClick={() => onDownloadChoice?.('data')}>
              <span>{downloadFooterModalDlData}</span>
              <InfoPin message={downloadFooterModalDlDataHelp} />
            </Button>
          </li>
          <li>
            <Button onClick={() => onDownloadChoice?.('model')}>
              <span>{downloadFooterModalDlModel}</span>
              <InfoPin message={downloadFooterModalDlModelHelp} />
            </Button>
          </li>
          <li>
            <Button onClick={() => onDownloadChoice?.('everything')}>
              <span>{downloadFooterModalDlEverything}</span>
              <InfoPin message={downloadFooterModalDlEverythingHelp} />
            </Button>
          </li>
          <li>
            <Button onClick={() => onClose}>{modalCancel}</Button>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
