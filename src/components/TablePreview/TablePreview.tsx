import classNames from 'classnames';
import {useState} from 'react';

import type {CSVColumns, CSVRows} from '../../types';

const MAX_PREVIEW_ROWS = 10;

interface TablePreviewProps {
  columns: CSVColumns;
  rows: CSVRows;
  selectedColumnId?: string;
  onClickOnColumn?: (column: string) => void;
}

function TablePreview({
  columns = [],
  rows = [],
  selectedColumnId,
  onClickOnColumn
}: TablePreviewProps) {
  const [hoveredColumn, setHoveredColumn] = useState(undefined);
  return (
    <div
      onMouseLeave={() => setHoveredColumn(undefined)}
      className="TablePreview">
      <table>
        <thead>
          <tr>
            {columns.map(column => {
              return (
                <th
                  onClick={() => onClickOnColumn(column)}
                  onMouseEnter={() => setHoveredColumn(column)}
                  className={classNames({
                    'is-active': column === selectedColumnId,
                    'is-hovered': column === hoveredColumn
                  })}
                  key={column}>
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, MAX_PREVIEW_ROWS).map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {columns.map(column => {
                  const dataPoint = row[column];
                  return (
                    <td
                      onMouseEnter={() => setHoveredColumn(column)}
                      className={classNames({
                        'is-active': column === selectedColumnId,
                        'is-hovered': column === hoveredColumn
                      })}
                      onClick={() => onClickOnColumn(column)}
                      key={column}>
                      {dataPoint}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default TablePreview;
