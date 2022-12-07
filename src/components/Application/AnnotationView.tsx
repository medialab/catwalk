import {useState} from 'react';

import MediaPreview from '../MediaPreview';
import DownloadFooter from '../DownloadFooter';
import Railway from '../Railway';
import TagsColumn from '../TagsColumn';
import {
  useCSVData,
  useAnnotationConfigActions,
  useDisplayModal,
  useCurrentRowIndex,
  useCurrentRowEntry,
  useToggleState,
  useArgsort
} from '../../hooks';

export function RailwayHandler() {
  const csvData = useCSVData();
  const [annotationConfig, , {setSortOrder, refreshSortOrder}] =
    useAnnotationConfigActions();
  const [currentRowIndex, setCurrentRowIndex] = useCurrentRowIndex();
  const [isEdited, setIsEdited] = useState(false);
  const argsort = useArgsort();

  if (!csvData || !argsort || currentRowIndex === undefined)
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
      argsort={argsort}
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
      onSortOrderChange={order => {
        setSortOrder(order);
      }}
      onRefreshSort={() => refreshSortOrder()}
    />
  );
}

export function TagsColumnHandler() {
  const csvData = useCSVData();
  const [annotationConfig, annotationStats, {setTag}] =
    useAnnotationConfigActions();
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
      onTagRequest={async event => {
        await setTag(event.categorization, event.modality);
      }}
    />
  );
}

export default function AnnotationView() {
  const csvData = useCSVData();
  const [annotationConfig, , {setPreviewType}] = useAnnotationConfigActions();
  const [[currentRowIndex, currentRow]] = useCurrentRowEntry();
  const displayModal = useDisplayModal();

  if (!csvData || !currentRow || currentRowIndex === undefined)
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
        selectedColumn={annotationConfig.selectedColumn}
        row={currentRow}
        rowIndex={currentRowIndex}
        onPreviewTypeChange={setPreviewType}
      />
      <DownloadFooter onClick={() => displayModal('download')} />
    </>
  );
}
