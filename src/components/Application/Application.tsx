import SplashView from './SplashView';
import LandingView from './LandingView';
import DataPreviewView from './DataPreviewView';
import AnnotationView, {
  RailwayHandler,
  TagsColumnHandler
} from './AnnotationView';
import {LangContext} from '../../contexts';
import Layout from '../Layout/Layout';
import MainColumn from '../Layout/MainColumn';
import MainRow from '../Layout/MainRow';
import Header from '../Header';
import Footer from '../Footer';
import Modals from '../Modals';
import {useView, useLoadCacheEffect, useDisplayModal} from '../../hooks';

import '../../styles/entrypoint.scss';

export default function Application() {
  const [view, setView] = useView();
  const displayModal = useDisplayModal();

  useLoadCacheEffect();

  let viewChild = <SplashView />;

  if (view === 'landing') {
    viewChild = <LandingView />;
  } else if (view === 'data-preview') {
    viewChild = <DataPreviewView />;
  } else if (view === 'annotation') {
    viewChild = <AnnotationView />;
  }

  return (
    <LangContext.Provider value="en">
      <Layout mode={view === 'annotation' ? 'annotation' : 'landing'}>
        {view === 'annotation' && <RailwayHandler />}
        <MainColumn>
          <MainRow>
            <Header
              allowBackLink={view !== 'splash' && view !== 'landing'}
              onBackLinkClick={() => {
                displayModal('reset-confirm');
              }}
            />
            {viewChild}
          </MainRow>
          <Footer />
        </MainColumn>
        {view === 'annotation' && <TagsColumnHandler />}
      </Layout>
      <Modals />
    </LangContext.Provider>
  );
}
