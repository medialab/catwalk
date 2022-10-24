import Select from 'react-select';

import {useI18nMessages} from '../../hooks';

type SamplePickerOption = {value: string; label: string};

interface SamplePickerProps {
  options: Array<SamplePickerOption>;
  onChange?: (sampleName: string) => void;
}

function SamplePicker({options, onChange}: SamplePickerProps) {
  const {chooseADataSample, chooseADataSamplePlaceholder} = useI18nMessages();
  return (
    <div className="SamplePicker">
      <div>{chooseADataSample}</div>
      <div>
        <Select
          onChange={e => onChange(e.value)}
          options={options}
          isSearchable={false}
          placeholder={chooseADataSamplePlaceholder}
        />
      </div>
    </div>
  );
}

export default SamplePicker;
