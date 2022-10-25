import classNames from 'classnames';

import type {CSVRows, AnnotationSortOrder, AnnotationSchema} from '../../types';
import {useI18nMessages} from '../../hooks';
import Button from '../Button';
import Modal from '../Modal';
import RailwayItem from './RailwayItem';

type RailwayProps = {
  rows: CSVRows;
  navKeyBindings: {
    prev: string;
    next: string;
  };
  schema: AnnotationSchema;
  sortOrder: AnnotationSortOrder;
  activeObjectIndex: number;

  isEdited?: boolean;
  isRefreshable?: boolean;
  keyAssignIsEdited?: boolean;
  editedKeyAssignCommand?: string; // @todo next or prev

  onEditOpenPrompt: () => void;
  onEditClosePrompt: () => void;
  onNavKeyAssignOpenPrompt: (commandId: string) => void;
  onNavKeyAssignClosePrompt: () => void;

  onRefreshSort: () => void;
  onNavToSibling: (direction: string) => void;
  onNavToIndex: (index: number) => void;
  onNavKeyAssignChoice: (command: string, key: string) => void;
  onSortOrderChange: (sortOrder: AnnotationSortOrder) => void;
};

function Railway({
  rows,
  schema,
  sortOrder = 'table',
  navKeyBindings,
  activeObjectIndex = 0,

  isEdited = false,
  isRefreshable = false,
  keyAssignIsEdited,
  editedKeyAssignCommand,

  onEditOpenPrompt,
  onEditClosePrompt,
  onNavKeyAssignOpenPrompt,
  onNavKeyAssignClosePrompt,

  onNavKeyAssignChoice,

  onRefreshSort,
  onNavToSibling,
  onNavToIndex,

  onSortOrderChange
}: RailwayProps) {
  const {
    railwaySortModeTitle,
    railwaySortModeTable,
    railwaySortModeNonAnnotated,
    railwaySortModeIncomplete,

    railwayArrowsKeyBinding,
    railwayArrowsEditKey,

    modalCancel,
    railwayKeyassignModalPrev,
    railwayKeyassignModalNext,
    railwayKeyassignModalTitle,
    modalKeyAssignMessage
  } = useI18nMessages();

  const sortOrderOptions: Array<{value: AnnotationSortOrder; label: string}> = [
    {
      value: 'table',
      label: railwaySortModeTable
    },
    {
      value: 'non-annotated',
      label: railwaySortModeNonAnnotated
    },
    {
      value: 'incomplete',
      label: railwaySortModeIncomplete
    }
  ];

  return (
    <div
      className={classNames('Railway', {
        'is-edited': isEdited,
        'is-refreshable': isRefreshable
      })}>
      <div className="railway-background" onClick={onEditClosePrompt} />
      <div className="main-column">
        <ul className="items-container">
          {rows.map((row, rowIndex) => {
            return (
              <RailwayItem
                row={row}
                schema={schema}
                key={rowIndex}
                isActive={rowIndex === activeObjectIndex}
                onClick={() => onNavToIndex(rowIndex)}
              />
            );
          })}
        </ul>
        <div className="edit-toggle-container">
          <Button
            isFullWidth
            isActive={isEdited}
            onClick={() => onEditOpenPrompt()}>
            *
          </Button>
        </div>
        <div className="refresh-container">
          <Button isFullWidth onClick={() => onRefreshSort()}>
            <span>⟳</span>
          </Button>
        </div>
      </div>

      <div className="secondary-column">
        <div className="arrows-wrapper">
          {[
            {
              icon: '↑',
              id: 'prev',
              binding: navKeyBindings.prev
            },
            {
              icon: '↓',
              id: 'next',
              binding: navKeyBindings.next
            }
          ].map(({icon, id, binding}) => (
            <div className="arrow-item-container" key={id}>
              <div className="arrow-button-container">
                <Button onClick={() => onNavToSibling(id)}>{icon}</Button>
              </div>
              <span className="key-binding-info">
                {railwayArrowsKeyBinding} <code>{binding}</code>
              </span>
              <Button
                onClick={() => onNavKeyAssignOpenPrompt(id)}
                className="edit-key-assign-btn">
                {railwayArrowsEditKey}
              </Button>
            </div>
          ))}
        </div>
        <div className="sort-options-container">
          <div className="sort-options-title">{railwaySortModeTitle}</div>
          <ul>
            {sortOrderOptions.map(({value, label}) => {
              const handleClick = () => {
                onSortOrderChange(value);
              };
              return (
                <li key={value}>
                  <Button
                    isActive={value === sortOrder}
                    onClick={handleClick}
                    isFullWidth>
                    {label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Modal isOpen={keyAssignIsEdited} onClose={onNavKeyAssignClosePrompt}>
        <h3>
          {railwayKeyassignModalTitle}
          <code>
            {editedKeyAssignCommand === 'next'
              ? railwayKeyassignModalNext
              : railwayKeyassignModalPrev}
          </code>
        </h3>
        <p>{modalKeyAssignMessage}</p>
        <Button onClick={onNavKeyAssignClosePrompt}>{modalCancel}</Button>
      </Modal>
    </div>
  );
}

export default Railway;
