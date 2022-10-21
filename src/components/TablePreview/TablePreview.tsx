import classNames from 'classnames';
import {useState} from 'react';

interface TablePreviewProps {
  columns: Array<string>;
  data: Array<object>;
  selectedColumnId?: string;
  onClickOnColumn?: (column: string) => void;
}

function TablePreview({
  columns = [],
  data = [],
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
          {data.map((datum, datumIndex) => {
            return (
              <tr key={datumIndex}>
                {columns.map(column => {
                  const dataPoint = datum[column];
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
