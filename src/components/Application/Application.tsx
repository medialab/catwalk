import LandingView from './LandingView';
import DataPreviewView from './DataPreviewView';
import AnnotationView, {
  RailwayWrapper,
  TagsColumnWrapper
} from './AnnotationView';
import {LangContext} from '../../contexts';
import Layout from '../Layout/Layout';
import MainColumn from '../Layout/MainColumn';
import MainRow from '../Layout/MainRow';
import Header from '../Header';
import Footer from '../Footer';
import Modals from '../Modals';
import {useView} from '../../hooks';

import '../../styles/entrypoint.scss';

export default function Application() {
  const [view, setView] = useView();

  let viewChild = <LandingView />;

  if (view === 'data-preview') {
    viewChild = <DataPreviewView />;
  } else if (view === 'annotation') {
    viewChild = <AnnotationView />;
  }

  return (
    <LangContext.Provider value="en">
      <Layout mode={view === 'annotation' ? 'annotation' : 'landing'}>
        <RailwayWrapper isShown={view === 'annotation'} />
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
        <TagsColumnWrapper isShown={view === 'annotation'} />
      </Layout>
      <Modals />
    </LangContext.Provider>
  );
}
