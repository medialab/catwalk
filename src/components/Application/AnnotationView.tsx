import type {ViewProps} from './types';

export default function AnnotationView({setView}: ViewProps) {
  return (
    <>
      <span>Annotation view</span>
      <button onClick={() => setView('landing')}>go to landing</button>
    </>
  );
}
