import classNames from 'classnames';

import type {
  CSVRows,
  AnnotationSortOrder,
  AnnotationSchema,
  NavKeyBindings,
  NavDirection
} from '../../types';
import {useI18nMessages} from '../../hooks';
import Button from '../Button';
import RailwayItem from './RailwayItem';

type RailwayProps = {
  rows: CSVRows;
  navKeyBindings: NavKeyBindings;
  schema: AnnotationSchema;
  sortOrder: AnnotationSortOrder;
  activeRowIndex: number;

  isEdited?: boolean;
  isRefreshable?: boolean;
  keyAssignIsEdited?: boolean;
  editedKeyAssignCommand?: string; // @todo next or prev

  onEditOpenPrompt?: () => void;
  onEditClosePrompt?: () => void;
  onNavKeyAssignOpenPrompt?: (direction: NavDirection) => void;
  onNavKeyAssignClosePrompt?: () => void;

  onRefreshSort?: () => void;
  onNavToSibling?: (direction: NavDirection) => void;
  onNavToIndex?: (index: number) => void;
  onNavKeyAssignChoice?: (command: string, key: string) => void;
  onSortOrderChange?: (sortOrder: AnnotationSortOrder) => void;
};

function Railway({
  rows,
  schema,
  sortOrder = 'table',
  navKeyBindings,
  activeRowIndex = 0,

  isEdited = false,
  isRefreshable = false,

  onEditOpenPrompt,
  onEditClosePrompt,
  onNavKeyAssignOpenPrompt,

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
    railwayArrowsEditKey
  } = useI18nMessages();

  // useMultipleKeypress<NavDirection>(navKeyBindings, direction => {
  //   onNavToSibling?.(direction);
  // });

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

  const maxRowIndex = rows.length - 1;

  return (
    <div
      key="railway"
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
                isActive={rowIndex === activeRowIndex}
                onClick={() => onNavToIndex?.(rowIndex)}
              />
            );
          })}
        </ul>
        <div className="edit-toggle-container">
          <Button
            isFullWidth
            isActive={isEdited}
            onClick={() => onEditOpenPrompt?.()}>
            *
          </Button>
        </div>
        <div className="refresh-container">
          <Button isFullWidth onClick={() => onRefreshSort?.()}>
            <span>⟳</span>
          </Button>
        </div>
      </div>

      <div className="secondary-column">
        <div className="arrows-wrapper">
          {[
            {
              icon: '↑',
              direction: 'prev' as const,
              binding: navKeyBindings.prev
            },
            {
              icon: '↓',
              direction: 'next' as const,
              binding: navKeyBindings.next
            }
          ].map(({icon, direction, binding}) => (
            <div className="arrow-item-container" key={direction}>
              <div className="arrow-button-container">
                <Button
                  onClick={() => {
                    // TODO: this could be displayed visually (ux)
                    if (direction === 'next') {
                      if (activeRowIndex >= maxRowIndex) return;
                    } else {
                      if (activeRowIndex <= 0) return;
                    }

                    onNavToSibling?.(direction);
                  }}>
                  {icon}
                </Button>
              </div>
              <span className="key-binding-info">
                {railwayArrowsKeyBinding} <code>{binding}</code>
              </span>
              <Button
                onClick={() => onNavKeyAssignOpenPrompt?.(direction)}
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
                onSortOrderChange?.(value);
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
    </div>
  );
}

export default Railway;
