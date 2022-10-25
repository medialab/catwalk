import type {ViewProps} from './types';

export default function AnnotationView({setView}: ViewProps) {
  return (
    <div>
      Annotation view
      <button onClick={() => setView('landing')}>go to landing</button>
    </div>
  );
}
