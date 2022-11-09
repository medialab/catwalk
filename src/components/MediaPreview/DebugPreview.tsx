import type {PreviewSpecification} from './types';

const debugPreviewSpecs: PreviewSpecification<string> = {
  label: 'mediatypeLabelDebug',
  parse(value) {
    return value;
  },
  Component({value, selectedColumn, row, rowIndex}) {
    return (
      <div>
        <p>
          Selected column: <strong>{selectedColumn}</strong>
        </p>
        <p>
          Parsed value: <strong>{value}</strong>
        </p>
        <p>
          Row index: <strong>{rowIndex}</strong>
        </p>
        <p>Row data:</p>
        <table>
          <tbody>
            {Object.keys(row).map(column => {
              return (
                <tr key={column}>
                  <td>
                    <strong>{column}</strong>
                  </td>
                  <td>{row[column]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default debugPreviewSpecs;
