import Ajv from 'ajv';

import type {AnnotationConfig} from './types';
import annotationConfigSchema from '../schemas/annotation-config.json';

const ajv = new Ajv();

const validateAnnotationConfig = ajv.compile<AnnotationConfig>(
  annotationConfigSchema
);

export {validateAnnotationConfig};
