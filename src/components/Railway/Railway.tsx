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
  onNavKeyAssignChoice: (
    command: string,
    key: string
  ) => void /* eslint no-unused-vars: 0 */;
  onSortOrderChange: (sortOrder: string) => void /* eslint no-unused-vars: 0 */;
};

function Railway({
  data,
  schema,
  sortOrder = 'table',
  navKeyBindings,

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
    railway_sort_mode_title,
    railway_sort_mode_table,
    railway_sort_mode_non_annotated,
    railway_sort_mode_incomplete,

    railway_arrows_key_binding,
    railway_arrows_edit_key,

    modal_cancel,
    railway_keyassign_modal_prev,
    railway_keyassign_modal_next,
    railway_keyassign_modal_title,
    modal_key_assign_message
  } = useI18nMessages();

  const sortOrderOptions = [
    {
      value: 'table',
      label: railway_sort_mode_table
    },
    {
      value: 'non_annotated',
      label: railway_sort_mode_non_annotated
    },
    {
      value: 'incomplete',
      label: railway_sort_mode_incomplete
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
                {railway_arrows_key_binding} <code>{binding}</code>
              </span>
              <Button
                onClick={() => onNavKeyAssignOpenPrompt(id)}
                className="edit-key-assign-btn">
                {railway_arrows_edit_key}
              </Button>
            </div>
          ))}
        </div>
        <div className="sort-options-container">
          <div className="sort-options-title">{railway_sort_mode_title}</div>
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
          {railway_keyassign_modal_title}
          <code>
            {editedKeyAssignCommand === 'next'
              ? railway_keyassign_modal_next
              : railway_keyassign_modal_prev}
          </code>
        </h3>
        <p>{modal_key_assign_message}</p>
        <Button onClick={onNavKeyAssignClosePrompt}>{modal_cancel}</Button>
      </Modal>
    </div>
  );
}

export default Railway;
