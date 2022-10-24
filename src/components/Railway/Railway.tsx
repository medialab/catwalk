import classNames from 'classnames';
import {useI18nMessages} from '../../hooks';
import Button from '../Button';
import Modal from '../Modal';
import RailwayItem from './RailwayItem';

type RailwayProps = {
  data: Array<object>;
  navKeyBindings: {
    prev: 'string';
    next: 'string';
  };
  schema: object;
  sortOrder: string;
  activeObjectIndex: number;

  isEdited: boolean;
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
  onSortOrderChange: (sortOrder: string) => void;
};

function Railway({
  data,
  schema,
  sortOrder = 'table',
  navKeyBindings,
  activeObjectIndex = 0,

  isEdited,
  isRefreshable,
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

  const sortOrderOptions = [
    {
      value: 'table',
      label: railwaySortModeTable
    },
    {
      value: 'non_annotated',
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
          {data.map((datum, datumIndex) => {
            return (
              <RailwayItem
                datum={datum}
                schema={schema}
                key={datumIndex}
                isActive={datumIndex === activeObjectIndex}
                onClick={() => onNavToIndex(datumIndex)}
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
