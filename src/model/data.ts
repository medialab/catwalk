import type {CSVRow, AnnotationStats, Categorization, Modality} from '../types';

export function tag(
  row: CSVRow,
  stats: AnnotationStats,
  categorization: Categorization,
  modality: Modality
): void {
  const field = categorization.name;

  const currentValue = row[field];
  const newValue = modality.name;

  if (currentValue) {
    stats[field][currentValue] -= 1;
  }

  stats[field][newValue] += 1;
  row[field] = newValue;
}
