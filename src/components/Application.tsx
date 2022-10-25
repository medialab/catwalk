import {useState} from 'react';

import type {View} from '../types';
import {LangContext} from '../contexts';
import Layout from './Layout/Layout';
import MainColumn from './Layout/MainColumn';
import MainRow from './Layout/MainRow';
import Header from './Header';
import Footer from './Footer';
import Dropzone from './Dropzone';
import SamplePicker from './SamplePicker';

import '../styles/entrypoint.scss';

const mockIntroText = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quibusdam amet voluptatem eius dolorum reprehenderit earum. Quis, dolorum cum in vel laudantium adipisci, beatae accusamus voluptatibus quos tenetur explicabo expedita.
`;

interface ViewProps {
  setView: (view: View) => void;
}

const LandingView = ({setView}: ViewProps) => {
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
};

const DataPreviewView = ({setView}: ViewProps) => {
  return (
    <div>
      <p>Coucou data preview.</p>
      <button onClick={() => setView('annotation')}>go to annotation</button>
    </div>
  );
};

const AnnotationView = ({setView}: ViewProps) => {
  return (
    <div>
      Annotation view
      <button onClick={() => setView('landing')}>go to landing</button>
    </div>
  );
};

export default function Application() {
  const [view, setView] = useState<View>('landing');

  let ViewComponent = LandingView;

  if (view === 'data-preview') {
    ViewComponent = DataPreviewView;
  } else if (view === 'annotation') {
    ViewComponent = AnnotationView;
  }

  return (
    <LangContext.Provider value="en">
      <Layout mode={view === 'annotation' ? 'annotation' : 'landing'}>
        <MainColumn>
          <MainRow>
            <Header />
            <ViewComponent setView={setView} />
          </MainRow>
          <Footer />
        </MainColumn>
      </Layout>
    </LangContext.Provider>
  );
}
