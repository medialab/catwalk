import DownloadModal from './DownloadModal';
import ResetConfirmModal from './ResetConfirmModal';
import {
  useModals,
  useResetProject,
  useCSVData,
  useAnnotationConfig
} from '../../hooks';
import {downloadConfig, downloadCsvRows} from '../../lib/download';

export default function Modals() {
  const [modal, setModal] = useModals();
  const resetProject = useResetProject();

  const csvData = useCSVData();
  const annotationConfig = useAnnotationConfig();

  const closeModal = setModal.bind(null, null);
  if (modal === null) return null;

  if (modal === 'download')
    return (
      <DownloadModal
        onClose={closeModal}
        onDownloadChoice={downloadType => {
          if (!csvData)
            throw new Error(
              'It should not be possible to download without data being loaded!'
            );

          if (!annotationConfig)
            throw new Error(
              'It should not be possible to download without config being loaded!'
            );

          if (downloadType === 'data' || downloadType === 'everything')
            downloadCsvRows(annotationConfig, csvData);

          if (downloadType === 'config' || downloadType === 'everything')
            downloadConfig(annotationConfig);
        }}
      />
    );
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
