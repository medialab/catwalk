import Select from 'react-select';

import {useI18nMessages} from '../../hooks';

interface SamplePickerProps {
  onChange?: (sampleName: string) => void;
}

function SamplePicker({onChange}: SamplePickerProps) {
  const {chooseADataSample, chooseADataSamplePlaceholder} = useI18nMessages();

  const publicSamples = [
    {
      value: '/public/samples/tweets_medialab.csv',
      label: 'tweets'
    },
    {
      value: '/public/samples/yt_french_presidential_election_2022.csv',
      label: 'youtube videos'
    },
    {
      value: '/public/samples/images_german_castles_in_1980.csv',
      label: 'photos'
    },
    {
      value: '/public/samples/french_news_sample.csv',
      label: 'websites'
    }
  ];

  return (
    <div className="SamplePicker">
      <div>{chooseADataSample}</div>
      <div>
        <Select
          onChange={e => e && onChange?.(e.value)}
          options={publicSamples}
          isSearchable={false}
          placeholder={chooseADataSamplePlaceholder}
        />
      </div>
    </div>
  );
}

export default SamplePicker;
