import Select from 'react-select';

import {useI18nMessages} from '../../hooks';

function SamplePicker({options, onChange}) {
  const {chooseADataSample, chooseADataSamplePlaceholder} = useI18nMessages();
  return (
    <div className="SamplePicker">
      <div>{chooseADataSample}</div>
      <div>
        <Select
          onChange={onChange}
          options={options}
          isSearchable={false}
          placeholder={chooseADataSamplePlaceholder}
        />
      </div>
    </div>
  );
}

export default SamplePicker;
