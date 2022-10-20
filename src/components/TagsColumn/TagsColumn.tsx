import classNames from 'classnames';

type TagsColumnProps = {
  model: object;
  isEdited: boolean;
  stats: object;
};

function TagsColumn({model, isEdited, stats}: TagsColumnProps) {
  return (
    <aside
      className={classNames('TagsColumn', {
        'is-edited': isEdited
      })}>
      <h3>Tags column</h3>
      <pre>
        <code>{JSON.stringify(stats)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(model)}</code>
      </pre>
    </aside>
  );
}

export default TagsColumn;
