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
  onModelFilesDrop: (
    files: Array<object>
  ) => void /* eslint no-unused-vars : 0 */;
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
    tags_edition_edit,
    tags_edition_done,
    tags_edition_invalid_model_file,
    tags_edition_processing_model_file,
    tags_edition_drop_model_file_prompt,
    tags_edition_new_categorization
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
            {tags_edition_new_categorization}
          </Button>
        </li>
      </ul>
      <div className="secondary-row">
        <div className="model-drop-container">
          <Dropzone
            dndPromptMessage={tags_edition_drop_model_file_prompt}
            onFilesDrop={onModelFilesDrop}
          />
          <div
            className={classNames('upload-status-container', {
              'is-hidden': uploadedModelStatus === undefined
            })}>
            <Notification isType={uploadedModelStatus}>
              {uploadedModelStatus === 'error'
                ? tags_edition_invalid_model_file
                : tags_edition_processing_model_file}
            </Notification>
          </div>
        </div>
        <div className="cta-container">
          <Button isFullWidth onClick={onEditTogglePrompt}>
            {isEdited ? tags_edition_done : tags_edition_edit}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default TagsColumn;
