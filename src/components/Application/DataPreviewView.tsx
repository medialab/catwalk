import type {ViewProps} from './types';
import TablePreview from '../TablePreview';
import InfoPin from '../InfoPin';
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

export default function DataPreviewView({setView}: ViewProps) {
  const [csvData] = useCSVData();

  if (!csvData)
    throw new Error(
      'It should not be possible to display DataPreviewView without data being loaded!'
    );

  const {columns, rows} = csvData;

  // TODO: display some indicators that we don't display all lines
  return (
    <>
      <TablePreview columns={columns} rows={rows} />
      <ColumnSelectionPrompt />
    </>
  );
}
