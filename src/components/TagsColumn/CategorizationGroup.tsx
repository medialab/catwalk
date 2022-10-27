import classNames from 'classnames';

import type {Modalities, ModalitiesStats} from '../../types';
import Button from '../Button';

interface CategorizationHeaderProps {
  isEdited: boolean;
  name: string;
  color: string;
  completedPercentage: number;
  onDeleteRequest?: () => void;
}

function CategorizationHeader({
  isEdited,
  name,
  color,
  completedPercentage,
  onDeleteRequest
}: CategorizationHeaderProps) {
  const safePercentage = Math.round(completedPercentage * 100);

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
              width: safePercentage + '%',
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
              {name} ({safePercentage + '%'})
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

interface ModalityGroupProps {
  name: string;
  count: number;
  share: number;
  keyboardKey: string;
  isEdited: boolean;

  onDeleteRequest?: () => void;
  onKeyBindingEditRequest?: () => void;
  onTagRequest?: () => void;
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
}: ModalityGroupProps) {
  return (
    <li
      className={classNames('ModalityGroup', {
        'is-edited': isEdited
      })}>
      <div className="key-btn-container">
        <Button
          onClick={() =>
            isEdited ? onKeyBindingEditRequest?.() : onTagRequest?.()
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
  modalities: Modalities;
  stats: ModalitiesStats;
  completedPercentage: number;
  total: number;
  onDeleteCategoryRequest: () => void;
};

export default function CategorizationGroup({
  isEdited,
  name,
  color,
  modalities,
  stats,
  completedPercentage,
  total,

  onDeleteCategoryRequest
}: CategorizationGroupProps) {
  return (
    <li
      className={classNames('CategorizationGroup', {
        'is-edited': isEdited
      })}>
      <CategorizationHeader
        isEdited={isEdited}
        name={name}
        completedPercentage={completedPercentage}
        color={color}
        onDeleteRequest={onDeleteCategoryRequest}
      />
      <ul className="modalities-list">
        {modalities.map(({name, key: keyboardKey}) => {
          const modalityStats = stats[name];

          return (
            <ModalityGroup
              key={name}
              name={name}
              count={modalityStats.count}
              share={modalityStats.count / total}
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
