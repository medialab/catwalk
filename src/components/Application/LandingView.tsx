import type {ViewProps} from './types';
import Dropzone from '../Dropzone';
import SamplePicker from '../SamplePicker';

const mockIntroText = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quibusdam amet voluptatem eius dolorum reprehenderit earum. Quis, dolorum cum in vel laudantium adipisci, beatae accusamus voluptatibus quos tenetur explicabo expedita.
`;

export default function LandingView({setView}: ViewProps) {
  return (
    <>
      <p>{mockIntroText}</p>
      <Dropzone />
      <SamplePicker
        options={[{value: 'super', label: 'Super fichier'}]}
        onChange={() => setView('data-preview')}
      />
    </>
  );
}
