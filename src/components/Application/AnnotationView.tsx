import MediaPreview from '../MediaPreview';
import DownloadFooter from '../DownloadFooter';
import Railway, {HiddenRailway} from '../Railway';
import TagsColumn, {HiddenTagsColumn} from '../TagsColumn';
import {useCSVData, useAnnotationConfig, useDisplayModal} from '../../hooks';
import {DEFAULT_ANNOTATION_SORT_ORDER} from '../../defaults';

export function RailwayWrapper({isShown = false}) {
  const [csvData] = useCSVData();
  const [annotationConfig] = useAnnotationConfig();

  if (!isShown) return <HiddenRailway />;

  if (!csvData)
    throw new Error(
      'It should not be possible to display Railway without data being loaded!'
    );

  if (!annotationConfig)
    throw new Error(
      'It should not be possible to display Railway without an annotation config!'
    );

  return (
    <Railway
      rows={csvData.rows}
      schema={annotationConfig.schema}
      navKeyBindings={annotationConfig.options.navKeyBindings}
      activeObjectIndex={0}
      sortOrder={DEFAULT_ANNOTATION_SORT_ORDER}
    />
  );
}

export function TagsColumnWrapper({isShown = false}) {
  const [csvData] = useCSVData();
  const [annotationConfig, annotationStats] = useAnnotationConfig();

  if (!isShown) return <HiddenTagsColumn />;

  if (!csvData)
    throw new Error(
      'It should not be possible to display Railway without data being loaded!'
    );

  if (!annotationConfig || !annotationStats)
    throw new Error(
      'It should not be possible to display Railway without an annotation config!'
    );

  return (
    <TagsColumn
      schema={annotationConfig.schema}
      stats={annotationStats}
      total={csvData.rows.length}
    />
  );
}

export default function AnnotationView() {
  const [csvData] = useCSVData();
  const [annotationConfig, , {setPreviewType}] = useAnnotationConfig();
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
        onPreviewTypeChange={setPreviewType}
        value={csvData.rows[0][annotationConfig.selectedColumn]}
      />
      <DownloadFooter onClick={() => displayModal('download')} />
    </>
  );
}
