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

type RenameCategorizationAction = {
  type: 'rename-categorization';
  categorization: Categorization;
  oldName: string;
  newName: string;
};

type RecolorCategorizationAction = {
  type: 'recolor-categorization';
  categorization: Categorization;
  oldColor: string;
  newColor: string;
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
  | RenameCategorizationAction
  | RecolorCategorizationAction
  | AddModalityAction;

export function diffAnnotationSchemas(
  before: AnnotationSchema,
  after: AnnotationSchema
): [Array<AnnotationSchemaDiffAction>] {
  const actions: Array<AnnotationSchemaDiffAction> = [];

  const beforeCategorizationIds = new Set(before.map(c => c.id));
  const beforeCategorizationIndex: Map<string, Categorization> = new Map();

  before.forEach(c => {
    beforeCategorizationIndex.set(c.id, c);
  });

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
      const earlierCategorizationState = beforeCategorizationIndex.get(c.id);

      if (!earlierCategorizationState)
        throw new Error('this should not be possible');

      if (earlierCategorizationState.name !== c.name) {
        actions.push({
          type: 'rename-categorization',
          categorization: c,
          oldName: earlierCategorizationState.name,
          newName: c.name
        });
      }

      if (earlierCategorizationState.color !== c.color) {
        actions.push({
          type: 'recolor-categorization',
          categorization: c,
          oldColor: earlierCategorizationState.color,
          newColor: c.color
        });
      }

      // TODO: scout modality changes here
    }
  });

  return [actions];
}
