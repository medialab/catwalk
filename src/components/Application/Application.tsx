import {useState} from 'react';

import type {View} from '../../types';
import LandingView from './LandingView';
import DataPreviewView from './DataPreviewView';
import AnnotationView from './AnnotationView';
import {LangContext} from '../../contexts';
import Layout from '../Layout/Layout';
import MainColumn from '../Layout/MainColumn';
import MainRow from '../Layout/MainRow';
import Header from '../Header';
import Footer from '../Footer';

import '../../styles/entrypoint.scss';

export default function Application() {
  const [view, setView] = useState<View>('landing');

  let viewChild = <LandingView setView={setView} />;

  if (view === 'data-preview') {
    viewChild = <DataPreviewView />;
  } else if (view === 'annotation') {
    viewChild = <AnnotationView setView={setView} />;
  }

  return (
    <LangContext.Provider value="en">
      <Layout mode={view === 'annotation' ? 'annotation' : 'landing'}>
        <MainColumn>
          <MainRow>
            <Header
              allowBackLink={view !== 'landing'}
              onBackLinkClick={() => {
                // TODO: decide whether to wipe global state here or not wrt csv data
                setView('landing');
              }}
            />
            {viewChild}
          </MainRow>
          <Footer />
        </MainColumn>
      </Layout>
    </LangContext.Provider>
  );
}
