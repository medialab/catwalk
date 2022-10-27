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
import Modals from '../Modals';
import Railway, {HiddenRailway} from '../Railway';
import TagsColumn, {HiddenTagsColumn} from '../TagsColumn';
import {useCSVData, useAnnotationConfig} from '../../hooks';
import {DEFAULT_ANNOTATION_SORT_ORDER} from '../../defaults';

import '../../styles/entrypoint.scss';

function RailwayWrapper({isShown = false}) {
  const [csvData] = useCSVData();
  const [annotationConfig] = useAnnotationConfig();

  if (!isShown) return <HiddenRailway />;

  if (!csvData)
    throw new Error(
      'It should not be possible to display Railway without data being loaded!'
    );

  if (!annotationConfig)
    throw new Error(
      'It should not be possible to display Railway without an annotation config!'
    );

  return (
    <Railway
      rows={csvData.rows}
      schema={annotationConfig.schema}
      navKeyBindings={annotationConfig.options.navKeyBindings}
      activeObjectIndex={0}
      sortOrder={DEFAULT_ANNOTATION_SORT_ORDER}
    />
  );
}

function TagsColumnWrapper({isShown = false}) {
  const [csvData] = useCSVData();
  const [annotationConfig, annotationStats] = useAnnotationConfig();

  if (!isShown) return <HiddenTagsColumn />;

  if (!csvData)
    throw new Error(
      'It should not be possible to display Railway without data being loaded!'
    );

  if (!annotationConfig || !annotationStats)
    throw new Error(
      'It should not be possible to display Railway without an annotation config!'
    );

  return (
    <TagsColumn
      schema={annotationConfig.schema}
      stats={annotationStats}
      total={csvData.rows.length}
    />
  );
}

export default function Application() {
  const [view, setView] = useState<View>('landing');

  let viewChild = <LandingView setView={setView} />;

  if (view === 'data-preview') {
    viewChild = <DataPreviewView setView={setView} />;
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
