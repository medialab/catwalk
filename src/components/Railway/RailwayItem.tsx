import classNames from 'classnames';

import type {CSVRow, AnnotationSchema} from '../../types';
import {useI18nMessages} from '../../hooks';

interface RailwayItemProps {
  row: CSVRow;
  schema: AnnotationSchema;
  isActive: boolean;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

function RailwayItem({row, schema, isActive, onClick}: RailwayItemProps) {
  const {railwayItemTooltipNoTagging} = useI18nMessages();

  // process data for mini viz
  // NOTE: @robindemourat I dropped the useMemo here because the row does not
  // actually change reference since I mutate for performance.
  const vizData = schema.reduce((items, {name, color, modalities}) => {
    const value =
      row[name] &&
      modalities.find(({name: modalityName}) => modalityName === row[name]);
    return [
      ...items,
      {
        name: name,
        color: color,
        isActive: !!value,
        value: value ? value.name : undefined
      }
    ];
  }, []);

  return (
    <li
      className={classNames('RailwayItem', {'is-active': isActive})}
      onClick={onClick}>
      <ul className="main-item-content">
        {vizData.map(category => (
          <div
            key={category.name}
            className="category-object"
            style={{
              background: category.color,
              opacity: category.isActive ? 0.7 : 0.1
            }}
          />
        ))}
      </ul>
      <div className="preview-content-container">
        <div className="preview-content">
          <div className="media-object-mini-preview">
            media object mini preview @todo
          </div>
          <ul className="tags-summary">
            {vizData.map(({name, color, value, isActive}) => {
              return (
                <li key={name} className="tag-summary-item">
                  <span className="color-marker" style={{background: color}} />
                  <strong className="category-name">{name}</strong>
                  <span>{': '}</span>
                  <span className="row-value-for-category">
                    {isActive ? value : railwayItemTooltipNoTagging}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default RailwayItem;
