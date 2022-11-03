import DownloadModal from './DownloadModal';
import ResetConfirmModal from './ResetConfirmModal';
import {useModals, useResetProject} from '../../hooks';

export default function Modals() {
  const [modal, setModal] = useModals();
  const resetProject = useResetProject();

  const closeModal = setModal.bind(null, null);

  if (modal === null) return null;

  if (modal === 'download') return <DownloadModal onClose={closeModal} />;
  if (modal === 'reset-confirm')
    return (
      <ResetConfirmModal
        onClose={closeModal}
        onAgree={async () => {
          await resetProject();
          closeModal();
        }}
      />
    );

  throw new Error('Modals component is not exhaustive!');
}
