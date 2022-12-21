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

type RenameModalityAction = {
  type: 'rename-modality';
  categorizationIndex: number;
  categorization: Categorization;
  modality: Modality;
  oldName: string;
  newName: string;
};

type AnnotationSchemaDiffAction =
  | AddCategorizationAction
  | DropCategorizationAction
  | RenameCategorizationAction
  | RecolorCategorizationAction
  | AddModalityAction
  | DropModalityAction
  | RenameModalityAction;

type CategorizatioNameConflictError = {
  type: 'categorization-name-conflict';
  name: string;
  categorizations: Array<[number, Categorization]>;
};

type ModalityNameConflictError = {
  type: 'modality-name-conflict';
  name: string;
  modalities: Array<[number, Modality]>;
  categorization: Categorization;
  categorizationIndex: number;
};

type AnnotationSchemaError =
  | CategorizatioNameConflictError
  | ModalityNameConflictError;

type IrrelevantCategorizationWarning = {
  type: 'irrelevant-categorization';
  categorization: Categorization;
  categorizationIndex: number;
  cardinality: number;
};

type AnnotationSchemaWarning = IrrelevantCategorizationWarning;

export type AnnotationSchemaDiffResult = {
  actions: Array<AnnotationSchemaDiffAction>;
  errors: Array<AnnotationSchemaError>;
  warnings: Array<AnnotationSchemaWarning>;
};

export function inferActionsFromSchemaDiff(
  before: AnnotationSchema,
  after: AnnotationSchema
): Array<AnnotationSchemaDiffAction> {
  const actions: Array<AnnotationSchemaDiffAction> = [];

  const beforeCategorizationIds = new Set(before.map(c => c.id));
  const beforeCategorizationIndex: Map<string, Categorization> = new Map();

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
    beforeCategorizationIndex.set(c.id, c);

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
      // TODO: we should track "false" modality changes
      // TODO: track modality key changes
      const afterModalityIds = new Set(c.modalities.map(m => m.id));
      const beforeModalityIds = new Set(
        earlierCategorizationState.modalities.map(m => m.id)
      );

      const beforeModalityIndex: Map<string, Modality> = new Map();

      const addedModalityIds = difference(afterModalityIds, beforeModalityIds);

      const droppedModalityIds = difference(
        beforeModalityIds,
        afterModalityIds
      );

      earlierCategorizationState.modalities.forEach(m => {
        beforeModalityIndex.set(m.id, m);

        if (droppedModalityIds.has(m.id)) {
          actions.push({
            type: 'drop-modality',
            modality: m,
            categorization: c,
            categorizationIndex: i
          });
        }
      });

      c.modalities.forEach(m => {
        if (addedModalityIds.has(m.id)) {
          actions.push({
            type: 'add-modality',
            modality: m,
            categorization: c,
            categorizationIndex: i
          });
        } else {
          const earlierModalityState = beforeModalityIndex.get(m.id);

          if (!earlierModalityState)
            throw new Error('this should not be possible');

          if (earlierModalityState.name !== m.name) {
            actions.push({
              type: 'rename-modality',
              categorization: c,
              categorizationIndex: i,
              modality: m,
              oldName: earlierModalityState.name,
              newName: m.name
            });
          }
        }
      });
    }
  });

  return actions;
}

// TODO: create a variant for a single categorization
// TODO: add support for already allocated names
export function reportErrorsAndWarningsFromSchema(schema: AnnotationSchema): {
  errors: Array<AnnotationSchemaError>;
  warnings: Array<AnnotationSchemaWarning>;
} {
  const errors: Array<AnnotationSchemaError> = [];
  const warnings: Array<AnnotationSchemaWarning> = [];

  const categorizationsByName: MultiMap<string, [number, Categorization]> =
    new MultiMap();

  schema.forEach((c, i) => {
    categorizationsByName.set(c.name, [i, c]);

    const modalitiesByName: MultiMap<string, [number, Modality]> =
      new MultiMap();

    c.modalities.forEach((m, j) => {
      modalitiesByName.set(m.name, [j, m]);
    });

    if (c.modalities.length < 2) {
      warnings.push({
        type: 'irrelevant-categorization',
        categorization: c,
        categorizationIndex: i,
        cardinality: c.modalities.length
      });
    }

    modalitiesByName.forEachAssociation((modalities, name) => {
      if (modalities.length < 2) return;

      errors.push({
        type: 'modality-name-conflict',
        modalities,
        name,
        categorization: c,
        categorizationIndex: i
      });
    });
  });

  categorizationsByName.forEachAssociation((categorizations, name) => {
    if (categorizations.length < 2) return;

    errors.push({type: 'categorization-name-conflict', categorizations, name});
  });

  return {errors, warnings};
}
