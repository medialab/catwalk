import {useCSVData} from '../../hooks';

export default function AnnotationView() {
  const [csvData] = useCSVData();

  if (!csvData)
    throw new Error(
      'It should not be possible to display AnnotationView without data being loaded!'
    );

  return <div>annotation view</div>;
}
