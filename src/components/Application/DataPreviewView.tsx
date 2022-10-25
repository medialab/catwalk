import type {ViewProps} from './types';

export default function DataPreviewView({setView}: ViewProps) {
  return (
    <div>
      <p>Coucou data preview.</p>
      <button onClick={() => setView('annotation')}>go to annotation</button>
    </div>
  );
}
