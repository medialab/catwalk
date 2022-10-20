import {useI18nMessages} from '../../hooks';
import Button from '../Button';
import InfoPin from '../InfoPin';
import Modal from '../Modal';

type DownloadFooterProps = {
  hasModalOpen?: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  onDownloadChoice: (type: string) => void /* eslint no-unused-vars: 0 */;
};

function DownloadFooter({
  hasModalOpen,
  onModalOpen,
  onModalClose,
  onDownloadChoice
}: DownloadFooterProps) {
  const {
    download_footer_download,
    download_footer_modal_title,
    download_footer_modal_dl_data,
    download_footer_modal_dl_data_help,
    download_footer_modal_dl_model,
    download_footer_modal_dl_model_help,
    download_footer_modal_dl_everything,
    download_footer_modal_dl_everything_help,
    modal_cancel
  } = useI18nMessages();

  return (
    <>
      <footer className="DownloadFooter">
        <Button isFullWidth onClick={onModalOpen}>
          {download_footer_download}
        </Button>
      </footer>
      <Modal isOpen={hasModalOpen} onClose={onModalClose}>
        <div className="DownloadFooterModalContent">
          <h3>{download_footer_modal_title}</h3>
          <ul>
            <li>
              <Button onClick={() => onDownloadChoice('data')}>
                <span>{download_footer_modal_dl_data}</span>
                <InfoPin message={download_footer_modal_dl_data_help} />
              </Button>
            </li>
            <li>
              <Button onClick={() => onDownloadChoice('model')}>
                <span>{download_footer_modal_dl_model}</span>
                <InfoPin message={download_footer_modal_dl_model_help} />
              </Button>
            </li>
            <li>
              <Button onClick={() => onDownloadChoice('everything')}>
                <span>{download_footer_modal_dl_everything}</span>
                <InfoPin message={download_footer_modal_dl_everything_help} />
              </Button>
            </li>
            <li>
              <Button onClick={() => onModalClose}>{modal_cancel}</Button>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default DownloadFooter;
