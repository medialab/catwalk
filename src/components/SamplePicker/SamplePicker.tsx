import Select from 'react-select';


function SamplePicker({
  options,
  onChange
}) {
  return (
    <div className="SamplePicker">
      <div>
        Choose a sample
      </div>
      <div>
        <Select
          onChange={onChange}
          options={options}
          isSearchable={false}
        />
      </div>
    </div>
  )
}

export default SamplePicker;