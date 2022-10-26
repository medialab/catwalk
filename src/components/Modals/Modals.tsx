import DownloadModal from './DownloadModal';
import {useModals} from '../../hooks';

export default function Modals() {
  const [modal, setModal] = useModals();

  const closeModal = setModal.bind(null, null);

  if (modal === null) return null;

  if (modal === 'download') return <DownloadModal onClose={closeModal} />;

  throw new Error('Modals component is not exhaustive!');
}
