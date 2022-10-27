import Select from 'react-select';

import {useI18nMessages} from '../../hooks';
import {DEFAULT_SAMPLES} from '../../defaults';

interface SamplePickerProps {
  onChange?: (sampleName: string) => void;
}

function SamplePicker({onChange}: SamplePickerProps) {
  const {chooseADataSample, chooseADataSamplePlaceholder} = useI18nMessages();

  return (
    <div className="SamplePicker">
      <div>{chooseADataSample}</div>
      <div>
        <Select
          menuPlacement="auto"
          onChange={e => e && onChange?.(e.value)}
          options={DEFAULT_SAMPLES}
          isSearchable={false}
          placeholder={chooseADataSamplePlaceholder}
        />
      </div>
    </div>
  );
}

export default SamplePicker;
