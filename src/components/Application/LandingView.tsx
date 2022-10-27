import {useState} from 'react';

import type {ParseCSVProgress} from '../../lib/parse';
import Dropzone from '../Dropzone';
import LoadingCartel from '../LoadingCartel';
import SamplePicker from '../SamplePicker';
import {parseCsvFile} from '../../lib/parse';
import {useSetCSVData, useI18nMessages, useView} from '../../hooks';

function IntroParagraph() {
  const {introductionText} = useI18nMessages();
  return <p>{introductionText}</p>;
}

export default function LandingView() {
  const [, setView] = useView();
  const setCSVData = useSetCSVData();
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
