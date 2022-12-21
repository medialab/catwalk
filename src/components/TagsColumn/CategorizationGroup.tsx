import classNames from 'classnames';
import zip from 'lodash/zip';

import {useI18nMessages} from '../../hooks';

import type {Categorization, Modality, ModalitiesStats} from '../../types';
import type {AnnotationConfigKeypressEvent} from '../../hooks';
import Button from '../Button';

interface CategorizationHeaderProps {
  isEdited: boolean;
  name: string;
  color: string;
  completedPercentage: number;
  onDelete?: () => void;
}

function CategorizationHeader({
  isEdited,
  name,
  color,
  completedPercentage,
  onDelete
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
              onChange={console.log}
            />
          ) : (
            <span className="title-readmode">
              {name} ({safePercentage + '%'})
            </span>
          )}
        </span>
      </h4>
      <div className="delete-btn-container">
        <Button onClick={onDelete}>🗑</Button>
      </div>
    </div>
  );
}

interface ModalityGroupProps {
  categorization: Categorization;
  modality: Modality;
  modalityState?: Modality;
  count: number;
  share: number;
  isEdited: boolean;

  onDelete?: () => void;
  onKeyBindingEdit?: () => void;
  onNameChange?: (newName: string) => void;
  onTag?: (event: AnnotationConfigKeypressEvent) => void;
}

function ModalityGroup({
  categorization,
  modality,
  modalityState,
  count,
  share,
  isEdited,

  onDelete,
  onNameChange,
  onKeyBindingEdit,
  onTag
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
              ? onKeyBindingEdit?.()
              : onTag?.({categorization, modality})
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
            value={modalityState ? modalityState.name : modality.name}
            placeholder="Type modality name"
            onChange={e => {
              onNameChange?.(e.target.value);
            }}
          />
        ) : (
          // <span className="title-readmode">{name} ({count})</span>
          <span className="title-readmode">
            {modality.name} ({count})
          </span>
        )}
      </div>

      <div className="delete-btn-container">
        <Button onClick={onDelete}>🗑</Button>
      </div>
    </li>
  );
}

type CategorizationGroupProps = {
  isEdited: boolean;
  categorization: Categorization;
  categorizationState?: Categorization;
  stats: ModalitiesStats;
  completedPercentage: number;
  total: number;
  onTag?: (event: AnnotationConfigKeypressEvent) => void;
  onModalityNameChange?: (modality: Modality, newName: string) => void;
  onDeleteCategorization?: () => void;
};

export default function CategorizationGroup({
  isEdited,
  categorization,
  categorizationState,
  stats,
  completedPercentage,
  total,
  onTag,
  onModalityNameChange,
  onDeleteCategorization
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
        onDelete={onDeleteCategorization}
      />
      <ul className="modalities-list">
        {zip(categorization.modalities, categorizationState?.modalities).map(
          ([modality, modalityState]: [Modality, Modality | undefined]) => {
            const modalityStats = stats[modality.name];

            return (
              <ModalityGroup
                key={modality.id}
                categorization={categorization}
                modality={modality}
                modalityState={modalityState}
                count={modalityStats.count}
                share={total === 0 ? 0 : modalityStats.count / total}
                isEdited={isEdited}
                onDelete={console.log}
                onKeyBindingEdit={console.log}
                onNameChange={newName => {
                  onModalityNameChange?.(modality, newName);
                }}
                onTag={onTag}
              />
            );
          }
        )}
        <li className="add-new-modality-container">
          <Button isFullWidth onClick={console.log}>
            {tagsEditionNewModality}
          </Button>
        </li>
      </ul>
    </li>
  );
}
