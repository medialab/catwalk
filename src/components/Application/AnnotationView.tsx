import {useState} from 'react';

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

export function RailwayHandler() {
  const csvData = useCSVData();
  const [annotationConfig] = useAnnotationConfig();
  const [currentRowIndex, setCurrentRowIndex] = useCurrentRowIndex();
  const [isEdited, setIsEdited] = useState(false);

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
      isEdited={isEdited}
      rows={csvData.rows}
      schema={annotationConfig.schema}
      navKeyBindings={annotationConfig.options.navKeyBindings}
      activeRowIndex={currentRowIndex}
      sortOrder={annotationConfig.options.sortOrder}
      onNavToIndex={nextIndex => {
        setCurrentRowIndex(nextIndex);
      }}
      onNavToSibling={direction => {
        const nextIndex = currentRowIndex + (direction === 'next' ? 1 : -1);
        setCurrentRowIndex(nextIndex);
      }}
      onEditOpenPrompt={() => setIsEdited(true)}
      onEditClosePrompt={() => setIsEdited(false)}
    />
  );
}

export function TagsColumnHandler() {
  const csvData = useCSVData();
  const [annotationConfig, annotationStats, {setTag}] = useAnnotationConfig();
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
        setTag(event.categorization, event.modality);
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
