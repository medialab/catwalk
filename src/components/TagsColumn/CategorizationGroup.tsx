import classNames from 'classnames';

import {useI18nMessages} from '../../hooks';

import type {
  Categorization,
  Modality,
  Modalities,
  ModalitiesStats
} from '../../types';
import type {AnnotationConfigKeypressEvent} from '../../hooks';
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
  categorization: Categorization;
  modality: Modality;
  count: number;
  share: number;
  isEdited: boolean;

  onDeleteRequest?: () => void;
  onKeyBindingEditRequest?: () => void;
  onTagRequest?: (event: AnnotationConfigKeypressEvent) => void;
}

function ModalityGroup({
  categorization,
  modality,
  count,
  share,
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
            isEdited
              ? onKeyBindingEditRequest?.()
              : onTagRequest?.({categorization, modality})
          }>
          {modality.key}
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
            value={modality.name}
            placeholder="Type modality name"
          />
        ) : (
          // <span className="title-readmode">{name} ({count})</span>
          <span className="title-readmode">
            {modality.name} ({count})
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
  categorization: Categorization;
  modalities: Modalities;
  stats: ModalitiesStats;
  completedPercentage: number;
  total: number;
  onTagRequest?: (event: AnnotationConfigKeypressEvent) => void;
  onDeleteCategoryRequest?: () => void;
};

export default function CategorizationGroup({
  isEdited,
  categorization,
  modalities,
  stats,
  completedPercentage,
  total,
  onTagRequest,
  onDeleteCategoryRequest
}: CategorizationGroupProps) {
  const {tagsEditionNewModality} = useI18nMessages();

  return (
    <li
      className={classNames('CategorizationGroup', {
        'is-edited': isEdited
      })}>
      <CategorizationHeader
        isEdited={isEdited}
        name={categorization.name}
        completedPercentage={completedPercentage}
        color={categorization.color}
        onDeleteRequest={onDeleteCategoryRequest}
      />
      <ul className="modalities-list">
        {modalities.map(modality => {
          const modalityStats = stats[modality.name];

          return (
            <ModalityGroup
              key={modality.id}
              categorization={categorization}
              modality={modality}
              count={modalityStats.count}
              share={total === 0 ? 0 : modalityStats.count / total}
              isEdited={isEdited}
              onDeleteRequest={console.log}
              onKeyBindingEditRequest={console.log}
              onTagRequest={onTagRequest}
            />
          );
        })}
        <li className="add-new-modality-container">
          <Button isFullWidth onClick={console.log}>
            {tagsEditionNewModality}
          </Button>
        </li>
      </ul>
    </li>
  );
}
