import DownloadModal from './DownloadModal';
import {useModals} from '../../hooks';

export default function Modals() {
  const [modal, setModal] = useModals();

  return (
    <>
      <DownloadModal
        isOpen={modal === 'download'}
        onClose={() => setModal(null)}
      />
    </>
  );
}
