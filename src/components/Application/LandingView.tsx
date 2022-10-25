import {useState} from 'react';

import type {ViewProps} from './types';
import Dropzone from '../Dropzone';
import LoadingCartel from '../LoadingCartel';
import SamplePicker from '../SamplePicker';
import {parseCsvFile} from '../../lib/parse';
import {useData, useI18nMessages} from '../../hooks';

function IntroParagraph() {
  const {introductionText} = useI18nMessages();
  return <p>{introductionText}</p>;
}

export default function LandingView({setView}: ViewProps) {
  const [_, setData] = useData();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <IntroParagraph />
      {!isLoading && (
        <>
          <Dropzone
            accept="csv"
            onFilesDrop={async file => {
              setIsLoading(true);
              const data = await parseCsvFile(file);
              setData(data);
            }}
          />
          <SamplePicker
            options={[{value: 'super', label: 'Super fichier'}]}
            onChange={() => setView('data-preview')}
          />
        </>
      )}
      {isLoading && <LoadingCartel loadingPercentage={50} />}
    </>
  );
}
