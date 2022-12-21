import classNames from 'classnames';
import zip from 'lodash/zip';

import type {
  AnnotationSchema,
  Categorization,
  AnnotationStats,
  Modality
} from '../../types';
import {
  useI18nMessages,
  useAnnotationSchemaKeypress,
  AnnotationConfigKeypressEvent
} from '../../hooks';
import Button from '../Button';
import Dropzone from '../Dropzone';
import Notification from '../Notification';
import CategorizationGroup from './CategorizationGroup';

type TagsColumnProps = {
  isEdited?: boolean;
  schema: AnnotationSchema;
  schemaState?: AnnotationSchema;
  stats: AnnotationStats;
  total: number;
  uploadedModelStatus?: 'error' | 'pending' | 'processing';
  onTag?: (event: AnnotationConfigKeypressEvent) => void;
  onNewCategorizationPrompt?: () => void;
  onModelFilesDrop?: (file: File) => void;
  onEditTogglePrompt?: () => void;
  onDeleteCategorization?: (category: Categorization) => void;
  onChangeModalityName?: (
    categorization: Categorization,
    modality: Modality,
    name: string
  ) => void;
  onChangeCategorizationName?: (
    categorization: Categorization,
    name: string
  ) => void;
};

function TagsColumn({
  isEdited = false,
  schema,
  schemaState,
  stats,
  total,
  uploadedModelStatus,

  onTag,
  onModelFilesDrop,
  onEditTogglePrompt,
  onNewCategorizationPrompt,
  onDeleteCategorization,
  onChangeModalityName,
  onChangeCategorizationName
}: TagsColumnProps) {
  const {
    tagsEditionEdit,
    tagsEditionDone,
    tagsEditionInvalidModelFile,
    tagsEditionProcessingModelFile,
    tagsEditionDropModelFilePrompt,
    tagsEditionNewCategorization
  } = useI18nMessages();

  useAnnotationSchemaKeypress(schema, event => {
    if (isEdited) return;
    onTag?.(event);
  });

  const counter = stats.counter;

  return (
    <aside
      key="tags-column"
      className={classNames('TagsColumn', {
        'is-edited': isEdited
      })}>
      <ul className="main-row">
        {zip(schema, schemaState).map(
          ([categorization, categorizationState]: [
            Categorization,
            Categorization | undefined
          ]) => {
            const categorizationStats = counter[categorization.name];

            return (
              <CategorizationGroup
                key={categorization.id}
                categorization={categorization}
                categorizationState={categorizationState}
                completedPercentage={categorizationStats.count / total}
                total={categorizationStats.count}
                stats={categorizationStats.modalities}
                isEdited={isEdited}
                onTag={onTag}
                onChangeModalityName={onChangeModalityName}
                onChangeCategorizationName={onChangeCategorizationName}
                onDeleteCategorization={() =>
                  onDeleteCategorization?.(categorization)
                }
              />
            );
          }
        )}
        <li className="add-new-categorization-container">
          <Button onClick={onNewCategorizationPrompt} isFullWidth>
            {tagsEditionNewCategorization}
          </Button>
        </li>
      </ul>
      <div className="secondary-row">
        <div className="model-drop-container">
          <Dropzone
            dndPromptMessage={tagsEditionDropModelFilePrompt}
            onFilesDrop={onModelFilesDrop}
          />
          <div
            className={classNames('upload-status-container', {
              'is-hidden': uploadedModelStatus === undefined
            })}>
            <Notification
              isType={uploadedModelStatus === 'error' ? 'error' : 'info'}>
              {uploadedModelStatus === 'error'
                ? tagsEditionInvalidModelFile
                : tagsEditionProcessingModelFile}
            </Notification>
          </div>
        </div>
        <div className="cta-container">
          <Button isFullWidth onClick={onEditTogglePrompt}>
            {isEdited ? tagsEditionDone : tagsEditionEdit}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default TagsColumn;
