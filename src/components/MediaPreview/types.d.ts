import type {InternationalizedString} from '../../../i18n';
import type {CSVRow} from '../../types';

export interface PreviewComponentProps<T> {
  selectedColumn: string;
  row: CSVRow;
  value: T;
  rowIndex?: number;
}

export interface PreviewSpecification<T> {
  label: InternationalizedString;
  parse(value: string): T | null;
  Component: React.FC<PreviewComponentProps<T>>;
}
