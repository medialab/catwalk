import type {
  CSVRow,
  AnnotationCounter,
  Categorization,
  Modality
} from '../types';

export function setTag(
  row: CSVRow,
  counter: AnnotationCounter,
  categorization: Categorization,
  modality: Modality
): void {
  const field = categorization.name;

  const currentValue = row[field];
  const newValue = modality.name;

  // Actually we are untagging
  if (currentValue === newValue) {
    counter[field].modalities[currentValue].count--;
    delete row[field];
    counter[field].count--;
    return;
  }

  // Decrementing stats for current value
  if (currentValue !== undefined) {
    counter[field].modalities[currentValue].count--;
  } else {
    counter[field].count++;
  }

  counter[field].modalities[newValue].count++;
  row[field] = newValue;
}
