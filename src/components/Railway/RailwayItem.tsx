import {useMemo} from 'react';
import {useI18nMessages} from '../../hooks';

function RailwayItem({datum, schema, onClick}) {
  const {railwayItemTooltipNoTagging} = useI18nMessages();
  // process data for mini viz
  const vizData = useMemo(() => {
    return schema.reduce((items, {name, color, modalities}) => {
      const value =
        datum[name] &&
        modalities.find(({name: modalityName}) => modalityName === datum[name]);
      return [
        ...items,
        {
          name: name,
          color: color,
          isActive: value && value !== '',
          value: value ? value.name : undefined
        }
      ];
    }, []);
  }, [datum, schema]);
  return (
    <li className="RailwayItem" onClick={onClick}>
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
                  <span className="datum-value-for-category">
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
