import classNames from 'classnames';

import type {
  AnnotationSchema,
  Categorization,
  AnnotationStats
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
  stats: AnnotationStats;
  total: number;
  uploadedModelStatus?: 'error' | 'pending' | 'processing';
  onTagRequest?: (event: AnnotationConfigKeypressEvent) => void;
  onNewCategorizationPrompt?: () => void;
  onModelFilesDrop?: (file: File) => void;
  onEditTogglePrompt?: () => void;

  onDeleteCategoryRequest?: (category: Categorization) => void;
};

function TagsColumn({
  isEdited = false,
  schema,
  stats,
  total,
  uploadedModelStatus,

  onTagRequest,
  onModelFilesDrop,
  onEditTogglePrompt,
  onNewCategorizationPrompt,
  onDeleteCategoryRequest
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
    onTagRequest?.(event);
  });

  const counter = stats.counter;

  return (
    <aside
      key="tags-column"
      className={classNames('TagsColumn', {
        'is-edited': isEdited
      })}>
      <ul className="main-row">
        {schema.map(categorization => {
          const categorizationStats = counter[categorization.name];

          return (
            <CategorizationGroup
              key={categorization.id}
              categorization={categorization}
              completedPercentage={categorizationStats.count / total}
              total={categorizationStats.count}
              stats={categorizationStats.modalities}
              modalities={categorization.modalities}
              isEdited={isEdited}
              onTagRequest={onTagRequest}
              onDeleteCategoryRequest={() =>
                onDeleteCategoryRequest?.(categorization)
              }
            />
          );
        })}
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
