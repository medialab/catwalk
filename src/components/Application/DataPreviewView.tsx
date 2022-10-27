import {useState} from 'react';

import type {MediaPreviewType} from '../../types';
import Button from '../Button';
import TablePreview from '../TablePreview';
import InfoPin from '../InfoPin';
import MediaPreview from '../MediaPreview';
import {
  useCSVData,
  useAnnotationConfig,
  useI18nMessages,
  useView
} from '../../hooks';
import {DEFAULT_MEDIA_PREVIEW_TYPE} from '../../defaults';

function ColumnSelectionPrompt() {
  const {previewSelectColumnPrompt, previewSelectColumnPromptExplanation} =
    useI18nMessages();

  return (
    <p>
      <span>{previewSelectColumnPrompt}</span>
      <InfoPin message={previewSelectColumnPromptExplanation} />
    </p>
  );
}

function ValidationButton({validate}) {
  const {previewValidation} = useI18nMessages();

  return (
    <Button isFullWidth onClick={validate}>
      {previewValidation}
    </Button>
  );
}

export default function DataPreviewView() {
  const [, setView] = useView();
  const [csvData] = useCSVData();
  const [, , {createAnnotationConfig}] = useAnnotationConfig();
  const [selectedColumn, setSelectedColumn] = useState<string | undefined>();
  const [previewType, setPreviewType] = useState<MediaPreviewType>(
    DEFAULT_MEDIA_PREVIEW_TYPE
  );

  if (!csvData)
    throw new Error(
      'It should not be possible to display DataPreviewView without data being loaded!'
    );

  const {columns, rows} = csvData;

  // TODO: display some indicators that we don't display all lines
  return (
    <>
      <TablePreview
        columns={columns}
        rows={rows}
        selectedColumn={selectedColumn}
        onClickOnColumn={setSelectedColumn}
      />
      <ColumnSelectionPrompt />
      {selectedColumn && (
        <>
          <MediaPreview
            value={rows[0][selectedColumn]}
            type={previewType}
            onPreviewTypeChange={setPreviewType}
          />
          <ValidationButton
            validate={() => {
              createAnnotationConfig({columns, selectedColumn, previewType});
              setView('annotation');
            }}
          />
        </>
      )}
    </>
  );
}
