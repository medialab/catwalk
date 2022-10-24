import classNames from 'classnames';
import Button from '../Button';

function CategorizationHeader({
  isEdited,
  name,
  color,
  completedPortion,
  onDeleteRequest
}) {
  return (
    <div
      className={classNames('CategorizationHeader', {
        'is-edited': isEdited
      })}>
      <h4 className="categorization-title-container">
        <div className="completed-portion-container">
          <div
            className="completed-portion-background"
            style={{
              background: color
            }}
          />
          <div
            className="completed-portion-bar"
            style={{
              width: completedPortion * 100 + '%',
              background: color
            }}
          />
        </div>
        <span className="title-container">
          {isEdited ? (
            <input
              className="title-writemode"
              value={name}
              placeholder="Type name"
            />
          ) : (
            <span className="title-readmode">
              {name} ({completedPortion * 100 + '%'})
            </span>
          )}
        </span>
      </h4>
      <div className="delete-btn-container">
        <Button onClick={onDeleteRequest}>🗑</Button>
      </div>
    </div>
  );
}

function ModalityGroup({
  name,
  count,
  share,
  keyboardKey,

  isEdited,

  onDeleteRequest,
  onKeyBindingEditRequest,
  onTagRequest
}) {
  return (
    <li
      className={classNames('ModalityGroup', {
        'is-edited': isEdited
      })}>
      <div className="key-btn-container">
        <Button
          onClick={() =>
            isEdited ? onKeyBindingEditRequest() : onTagRequest()
          }>
          {keyboardKey}
        </Button>
      </div>
      <div className="title-container">
        <div className="share-bar-background">
          <div
            className="share-bar"
            style={{
              width: share * 100 + '%'
            }}
          />
        </div>
        {isEdited ? (
          <input
            className="title-writemode"
            value={name}
            placeholder="Type modality name"
          />
        ) : (
          // <span className="title-readmode">{name} ({count})</span>
          <span className="title-readmode">
            {name} ({count})
          </span>
        )}
      </div>

      <div className="delete-btn-container">
        <Button onClick={onDeleteRequest}>🗑</Button>
      </div>
    </li>
  );
}

type CategorizationGroupProps = {
  isEdited: boolean;
  name: string;
  color: string;
  completedPortion: number;
  modalities: Array<any>;
  onDeleteCategoryRequest: () => void;
};
export default function CategorizationGroup({
  isEdited,
  name,
  color,
  completedPortion,
  modalities,

  onDeleteCategoryRequest
}: CategorizationGroupProps) {
  const modalitiesTotal = modalities.reduce((sum, {count}) => sum + count, 0);
  return (
    <li
      className={classNames('CategorizationGroup', {
        'is-edited': isEdited
      })}>
      <CategorizationHeader
        isEdited={isEdited}
        name={name}
        completedPortion={completedPortion}
        color={color}
        onDeleteRequest={onDeleteCategoryRequest}
      />
      <ul className="modalities-list">
        {modalities.map(({name, count, key: keyboardKey}) => {
          return (
            <ModalityGroup
              key={name}
              name={name}
              count={count}
              share={count / modalitiesTotal}
              keyboardKey={keyboardKey}
              isEdited={isEdited}
              onDeleteRequest={console.log}
              onKeyBindingEditRequest={console.log}
              onTagRequest={console.log}
            />
          );
        })}
        <li className="add-new-modality-container">
          <Button isFullWidth onClick={console.log}>
            Add modality
          </Button>
        </li>
      </ul>
    </li>
  );
}
