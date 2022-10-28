import classNames from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';

import type {
  CSVRows,
  AnnotationSortOrder,
  AnnotationSchema,
  NavKeyBindings,
  NavDirection
} from '../../types';
import {useI18nMessages, useMultipleKeypress} from '../../hooks';
import Button from '../Button';
import RailwayItem from './RailwayItem';
import {flipObject} from '../../lib/utils';

// TODO: this could be displayed visually (ux)
function canNavigate(index: number, maxIndex: number, direction: NavDirection) {
  if (direction === 'next') {
    if (index >= maxIndex) return false;
  } else {
    if (index <= 0) return false;
  }

  return true;
}

const MIN_ITEM_HEIGHT = 4 + 1;

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

  const maxRowIndex = rows.length - 1;

  useMultipleKeypress<NavDirection>(flipObject(navKeyBindings), direction => {
    if (!canNavigate(activeRowIndex, maxRowIndex, direction)) return;
    onNavToSibling?.(direction);
  });

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
      key="railway"
      className={classNames('Railway', {
        'is-edited': isEdited,
        'is-refreshable': isRefreshable
      })}>
      <div className="railway-background" onClick={onEditClosePrompt} />
      <div className="main-column">
        <ul className="items-container">
          <AutoSizer>
            {({height, width}) => {
              const idealHeightPerItem = Math.floor(height / rows.length);

              const itemSize = Math.max(MIN_ITEM_HEIGHT, idealHeightPerItem);

              console.log(height, itemSize);

              function Row({
                index,
                style
              }: {
                index: number;
                style: React.CSSProperties;
              }) {
                return (
                  <RailwayItem
                    style={style}
                    row={rows[index]}
                    schema={schema}
                    key={index}
                    isActive={index === activeRowIndex}
                    onClick={() => onNavToIndex?.(index)}
                  />
                );
              }

              return (
                <div style={{height, width, padding: 0, margin: 0}}>
                  <FixedSizeList
                    height={height}
                    itemCount={rows.length}
                    itemSize={itemSize}
                    // overscanCount={50}
                    width={width}>
                    {Row}
                  </FixedSizeList>
                </div>
              );
            }}
          </AutoSizer>
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
                    if (!canNavigate(activeRowIndex, maxRowIndex, direction))
                      return;
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
