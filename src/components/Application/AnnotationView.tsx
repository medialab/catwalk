import MediaPreview from '../MediaPreview';
import DownloadFooter from '../DownloadFooter';
import Railway from '../Railway';
import TagsColumn from '../TagsColumn';
import {
  useCSVData,
  useAnnotationConfig,
  useDisplayModal,
  useCurrentRowIndex,
  useCurrentRow,
  useToggleState
} from '../../hooks';
import {DEFAULT_ANNOTATION_SORT_ORDER} from '../../defaults';

export function RailwayHandler() {
  const csvData = useCSVData();
  const [annotationConfig] = useAnnotationConfig();
  const [currentRowIndex, setCurrentRowIndex] = useCurrentRowIndex();

  if (!csvData || currentRowIndex === null)
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
      activeObjectIndex={currentRowIndex}
      sortOrder={DEFAULT_ANNOTATION_SORT_ORDER}
      onNavToIndex={nextIndex => {
        setCurrentRowIndex(nextIndex);
      }}
    />
  );
}

export function TagsColumnHandler() {
  const csvData = useCSVData();
  const [annotationConfig, annotationStats] = useAnnotationConfig();
  const [isEdited, toggleIsEdited] = useToggleState();

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
      isEdited={isEdited}
      schema={annotationConfig.schema}
      stats={annotationStats}
      total={csvData.rows.length}
      onEditTogglePrompt={toggleIsEdited}
      onTagRequest={event => {
        // setTag(event);
      }}
    />
  );
}

export default function AnnotationView() {
  const csvData = useCSVData();
  const [annotationConfig, , {setPreviewType}] = useAnnotationConfig();
  const [currentRow] = useCurrentRow();
  const displayModal = useDisplayModal();

  if (!csvData || !currentRow)
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
        value={currentRow[annotationConfig.selectedColumn]}
      />
      <DownloadFooter onClick={() => displayModal('download')} />
    </>
  );
}
