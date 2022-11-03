import {useState} from 'react';

import type {MediaPreviewType} from '../../types';
import Button from '../Button';
import TablePreview from '../TablePreview';
import InfoPin from '../InfoPin';
import MediaPreview from '../MediaPreview';
import {
  useCSVData,
  useCreateAnnotationConfig,
  useI18nMessages,
  useSetView
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

interface ValidationButtonProps {
  validate: () => void;
}

function ValidationButton({validate}: ValidationButtonProps) {
  const {previewValidation} = useI18nMessages();

  return (
    <Button isFullWidth onClick={validate}>
      {previewValidation}
    </Button>
  );
}

export default function DataPreviewView() {
  const setView = useSetView();
  const csvData = useCSVData();
  const createAnnotationConfig = useCreateAnnotationConfig();
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
      {selectedColumn !== undefined && (
        <>
          <MediaPreview
            selectedColumn={selectedColumn}
            row={rows[0]}
            rowIndex={0}
            type={previewType}
            onPreviewTypeChange={setPreviewType}
          />
          <ValidationButton
            validate={async () => {
              await createAnnotationConfig({
                columns,
                selectedColumn,
                previewType
              });
              setView('annotation');
            }}
          />
        </>
      )}
    </>
  );
}
