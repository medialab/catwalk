import MediaPreview from '../MediaPreview';
import DownloadFooter from '../DownloadFooter';
import {useCSVData, useAnnotationConfig, useDisplayModal} from '../../hooks';

export default function AnnotationView() {
  const [csvData] = useCSVData();
  const [annotationConfig] = useAnnotationConfig();
  const displayModal = useDisplayModal();

  if (!csvData)
    throw new Error(
      'It should not be possible to display AnnotationView without data being loaded!'
    );

  if (!annotationConfig)
    throw new Error(
      'It should not be possible to display AnnotationView without an annotation config!'
    );

  return (
    <>
      <MediaPreview
        type={annotationConfig.previewType}
        value={csvData.rows[0][annotationConfig.selectedColumn]}
      />
      <DownloadFooter onClick={() => displayModal('download')} />
    </>
  );
}
