import {useState} from 'react';

import type {ParseCSVProgress} from '../../lib/parse';
import type {ViewProps} from './types';
import Dropzone from '../Dropzone';
import LoadingCartel from '../LoadingCartel';
import SamplePicker from '../SamplePicker';
import {parseCsvFile} from '../../lib/parse';
import {useCSVData, useI18nMessages} from '../../hooks';

function IntroParagraph() {
  const {introductionText} = useI18nMessages();
  return <p>{introductionText}</p>;
}

export default function LandingView({setView}: ViewProps) {
  const [, setCSVData] = useCSVData();
  const [isLoading, setIsLoading] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<ParseCSVProgress>({
    lines: 0,
    percent: 0
  });

  async function fileToDataPreview(file: File) {
    const data = await parseCsvFile(file, progress => {
      setCurrentProgress(progress);
    });

    setCSVData(data);
    setView('data-preview');
  }

  return (
    <>
      <IntroParagraph />
      {!isLoading && (
        <>
          <Dropzone
            accept="csv"
            onFilesDrop={async file => {
              setIsLoading(true);
              fileToDataPreview(file);
            }}
          />
          <SamplePicker
            options={[
              {value: '/public/samples/dummy.csv', label: 'Super Fichier'}
            ]}
            onChange={async sampleName => {
              setIsLoading(true);
              const file = await fetch(sampleName)
                .then(res => res.blob())
                .then(
                  resBlob =>
                    new File([resBlob], sampleName, {type: resBlob.type})
                );
              fileToDataPreview(file);
            }}
          />
        </>
      )}
      {isLoading && (
        <LoadingCartel
          loadingPercentage={currentProgress.percent}
          lines={currentProgress.lines}
        />
      )}
    </>
  );
}
