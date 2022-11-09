import Modal from './Modal';
import Button from '../Button';
import {useI18nMessages} from '../../hooks';

interface DownloadModalProps {
  onClose?: () => void;
  onAgree?: () => void;
}

export default function ResetConfirmModal({
  onClose,
  onAgree
}: DownloadModalProps) {
  const {
    resetConfirmModalTitle,
    resetConfirmModalAgree,
    resetConfirmModalCancel
  } = useI18nMessages();

  return (
    <Modal onClose={onClose}>
      <div className="ResetConfirmModalContent">
        <h3>{resetConfirmModalTitle}</h3>
        <ul>
          <li>
            <Button onClick={onAgree}>
              <span>{resetConfirmModalAgree}</span>
            </Button>
          </li>
          <li>
            <Button onClick={onClose}>
              <span>{resetConfirmModalCancel}</span>
            </Button>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
