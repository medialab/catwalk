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
import {useCSVData} from '../hooks';

import '../styles/entrypoint.scss';

const mockIntroText = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quibusdam amet voluptatem eius dolorum reprehenderit earum. Quis, dolorum cum in vel laudantium adipisci, beatae accusamus voluptatibus quos tenetur explicabo expedita.
`;

const LandingView = ({setView}) => {
  const [_, setCSVData] = useCSVData();

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

const DataPreviewView = () => {
  const [csvData] = useCSVData();

  return <p>Coucou data preview: {Object.keys(csvData[0]).join(', ')}</p>;
};

export default function Application() {
  const [view, setView] = useState<View>('landing');

  let ViewComponent = LandingView;

  if (view === 'data-preview') {
    ViewComponent = DataPreviewView;
  }

  return (
    <LangContext.Provider value="en">
      <Layout mode="landing">
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
