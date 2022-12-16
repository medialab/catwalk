import {difference} from 'mnemonist/set';

import type {AnnotationSchema, Categorization, Modality} from '../types';

type AddCategorizationAction = {
  type: 'add-categorization';
  categorization: Categorization;
};

type DropCategorizationAction = {
  type: 'drop-categorization';
  categorization: Categorization;
};

type AddModalityAction = {
  type: 'add-modality';
  categorizationIndex: number;
  categorization: Categorization;
  modality: Modality;
};

type AnnotationSchemaDiffAction =
  | AddCategorizationAction
  | DropCategorizationAction
  | AddModalityAction;

export function diffAnnotationSchemas(
  before: AnnotationSchema,
  after: AnnotationSchema
): [Array<AnnotationSchemaDiffAction>] {
  const actions: Array<AnnotationSchemaDiffAction> = [];

  const beforeCategorizationIds = new Set(before.map(c => c.id));
  const afterCategorizationIds = new Set(after.map(c => c.id));

  const addedCategorizationIds = difference(
    afterCategorizationIds,
    beforeCategorizationIds
  );

  const droppedCategorizationIds = difference(
    beforeCategorizationIds,
    afterCategorizationIds
  );

  before.forEach(c => {
    if (droppedCategorizationIds.has(c.id)) {
      actions.push({type: 'drop-categorization', categorization: c});
    }
  });

  after.forEach(c => {
    if (addedCategorizationIds.has(c.id)) {
      actions.push({type: 'add-categorization', categorization: c});
    } else {
      // TODO: scout modality changes here
      // TODO: scout categorization renames here
    }
  });

  return [actions];
}
