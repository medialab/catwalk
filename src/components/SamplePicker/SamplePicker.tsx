import Select from 'react-select';

import { useI18nMessages } from '../../hooks';

function SamplePicker({options, onChange}) {
  const {
    choose_a_data_sample,
    choose_a_data_sample_placeholder
  } = useI18nMessages();
  return (
    <div className="SamplePicker">
      <div>{choose_a_data_sample}</div>
      <div>
        <Select 
          onChange={onChange} 
          options={options} 
          isSearchable={false} 
          placeholder={choose_a_data_sample_placeholder}
        />
      </div>
    </div>
  );
}

export default SamplePicker;
