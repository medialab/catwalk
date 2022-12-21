import {useState} from 'react';

import type {AnnotationSchema, Categorization, Modality} from '../types';
import {renameModality} from '../model';

export type SchemaStateActions = {
  resetWith: (schema: AnnotationSchema) => void;
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
    renameModality(categorization, modality, name) {
      setCurrentSchemaState(
        renameModality(currentSchemaState, categorization, modality, name)
      );
    }
  };

  return [currentSchemaState, actions];
}
