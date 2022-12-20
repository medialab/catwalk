import {difference} from 'mnemonist/set';
import MultiMap from 'mnemonist/multi-map';

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

type DropModalityAction = {
  type: 'drop-modality';
  categorizationIndex: number;
  categorization: Categorization;
  modality: Modality;
};

type AnnotationSchemaDiffAction =
  | AddCategorizationAction
  | DropCategorizationAction
  | RenameCategorizationAction
  | RecolorCategorizationAction
  | AddModalityAction
  | DropModalityAction;

type CategorizatioNameConflictError = {
  type: 'categorization-name-conflict';
  name: string;
  categorizations: Array<[number, Categorization]>;
};

type AnnotationSchemaDiffError = CategorizatioNameConflictError;

type IrrelevantCategorizationWarning = {
  type: 'irrelevant-categorization';
  categorization: Categorization;
  categorizationIndex: number;
  cardinality: number;
};

type AnnotationSchemaDiffWarning = IrrelevantCategorizationWarning;

export function diffAnnotationSchemas(
  before: AnnotationSchema,
  after: AnnotationSchema
): {
  actions: Array<AnnotationSchemaDiffAction>;
  errors: Array<AnnotationSchemaDiffError>;
  warnings: Array<AnnotationSchemaDiffWarning>;
} {
  const actions: Array<AnnotationSchemaDiffAction> = [];
  const errors: Array<AnnotationSchemaDiffError> = [];
  const warnings: Array<AnnotationSchemaDiffWarning> = [];

  const beforeCategorizationIds = new Set(before.map(c => c.id));
  const beforeCategorizationIndex: Map<string, Categorization> = new Map();

  const categorizationByNames: MultiMap<string, [number, Categorization]> =
    new MultiMap();

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

  after.forEach((c, i) => {
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

      // Modality changes
      const afterModalityIds = new Set(c.modalities.map(m => m.id));
      const beforeModalityIds = new Set(
        earlierCategorizationState.modalities.map(m => m.id)
      );

      const addedModalityIds = difference(afterModalityIds, beforeModalityIds);

      const droppedModalityIds = difference(
        beforeModalityIds,
        afterModalityIds
      );
    }

    if (c.modalities.length < 2) {
      warnings.push({
        type: 'irrelevant-categorization',
        categorization: c,
        categorizationIndex: i,
        cardinality: c.modalities.length
      });
    }

    categorizationByNames.set(c.name, [i, c]);
  });

  categorizationByNames.forEachAssociation((categorizations, name) => {
    if (categorizations.length < 2) return;

    errors.push({type: 'categorization-name-conflict', categorizations, name});
  });

  return {actions, errors, warnings};
}
