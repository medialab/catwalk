import {useState} from 'react';

import type {ParseCSVProgress} from '../../lib/parse';
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
  const [currentProgress, setCurrentProgress] = useState<ParseCSVProgress>({
    lines: 0,
    percent: 0
  });

  return (
    <>
      <IntroParagraph />
      {!isLoading && (
        <>
          <Dropzone
            accept="csv"
            onFilesDrop={async file => {
              setIsLoading(true);
              const data = await parseCsvFile(file, progress => {
                setCurrentProgress(progress);
              });
              setData(data);
            }}
          />
          <SamplePicker
            options={[{value: 'super', label: 'Super fichier'}]}
            onChange={() => setView('data-preview')}
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
