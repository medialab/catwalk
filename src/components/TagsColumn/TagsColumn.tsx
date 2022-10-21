import classNames from 'classnames';
import {useI18nMessages} from '../../hooks';
import Button from '../Button';
import Dropzone from '../Dropzone';
import Notification from '../Notification';
import CategorizationGroup from './CategorizationGroup';

type TagsColumnProps = {
  model: object;
  isEdited: boolean;
  stats: Array<any>;
  uploadedModelStatus?: 'error' | 'pending' | 'processing';
  onNewCategorizationPrompt: () => void;
  onModelFilesDrop: (files: Array<object>) => void;
  onEditTogglePrompt: () => void;

  onDeleteCategoryRequest: (category: object) => void;
};

function TagsColumn({
  model,
  isEdited,
  stats,
  uploadedModelStatus,

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
  return (
    <aside
      className={classNames('TagsColumn', {
        'is-edited': isEdited
      })}>
      <ul className="main-row">
        {stats.map((category, categoryId) => {
          return (
            <CategorizationGroup
              key={categoryId}
              name={category.name}
              completedPortion={category.completedPortion}
              modalities={category.modalities}
              color={category.color}
              isEdited={isEdited}
              onDeleteCategoryRequest={() => onDeleteCategoryRequest(category)}
            />
          );
        })}
        <li>
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
