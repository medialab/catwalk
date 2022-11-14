import {useState} from 'react';
import formatInt from 'comma-number';

import type {ParseCSVProgress} from '../../lib/parse';
import Dropzone from '../Dropzone';
import LoadingCartel from '../LoadingCartel';
import SamplePicker from '../SamplePicker';
import {parseCsvFile} from '../../lib/parse';
import {
  useSetCSVData,
  useI18nMessages,
  useSetView,
  useAddRowsToCache
} from '../../hooks';

function IntroParagraph() {
  const {introductionText} = useI18nMessages();
  return <p>{introductionText}</p>;
}

export default function LandingView() {
  const {loadingParsedLinesTemplate} = useI18nMessages();
  const addRowsToCache = useAddRowsToCache();

  const setView = useSetView();
  const setCSVData = useSetCSVData();
  const [isLoading, setIsLoading] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<ParseCSVProgress>({
    lines: 0,
    percent: 0
  });

  async function fileToDataPreview(file: File) {
    const data = await parseCsvFile(file, {
      onProgress: progress => {
        setCurrentProgress(progress);
      },
      onChunk: async ({offset, rows}) => {
        await addRowsToCache(offset, rows);
      }
    });

    await setCSVData(data);
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
            onChange={sampleName => {
              setIsLoading(true);
              fetch(sampleName)
                .then(res => res.blob())
                .then(resBlob =>
                  fileToDataPreview(
                    new File([resBlob], sampleName, {type: resBlob.type})
                  )
                );
            }}
          />
        </>
      )}
      {isLoading && (
        <LoadingCartel
          loadingPercentage={currentProgress.percent}
          message={loadingParsedLinesTemplate({
            count: formatInt(currentProgress.lines)
          })}
        />
      )}
    </>
  );
}