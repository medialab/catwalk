import {useState} from 'react';

import type {ViewProps} from './types';
import Button from '../Button';
import TablePreview from '../TablePreview';
import InfoPin from '../InfoPin';
import MediaPreview from '../MediaPreview';
import {useCSVData, useI18nMessages} from '../../hooks';

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

export default function DataPreviewView({setView}: ViewProps) {
  const [csvData] = useCSVData();
  const [selectedColumn, setSelectedColumn] = useState<string | undefined>();

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
          <MediaPreview value={rows[0][selectedColumn]} />
          <ValidationButton validate={() => setView('annotation')} />
        </>
      )}
    </>
  );
}
