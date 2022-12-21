import {useState} from 'react';

import type {AnnotationSchema, Categorization, Modality} from '../types';
import {renameModality, renameCategorization} from '../model';

export type SchemaStateActions = {
  resetWith: (schema: AnnotationSchema) => void;
  renameCategorization: (categorization: Categorization, name: string) => void;
  renameModality: (
    categorization: Categorization,
    modality: Modality,
    name: string
  ) => void;
};

export function useSchemaState(
  initialState?: AnnotationSchema
): [AnnotationSchema, SchemaStateActions] {
  if (!initialState)
    throw new Error(
      'cannot useSchemaState without a proper annotation schema!'
    );

  const [currentSchemaState, setCurrentSchemaState] = useState(initialState);

  const actions: SchemaStateActions = {
    resetWith(schema) {
      setCurrentSchemaState(schema);
    },
    renameCategorization(categorization, name) {
      setCurrentSchemaState(
        renameCategorization(currentSchemaState, categorization, name)
      );
    },
    renameModality(categorization, modality, name) {
      setCurrentSchemaState(
        renameModality(currentSchemaState, categorization, modality, name)
      );
    }
  };

  return [currentSchemaState, actions];
}
