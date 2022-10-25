import classNames from 'classnames';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {useI18nMessages} from '../../hooks';

interface DropzoneProps {
  onFilesDrop?: (file: File) => void;
  dndPromptMessage?: string;
}

function Dropzone({onFilesDrop, dndPromptMessage}: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    if (onFilesDrop) onFilesDrop(acceptedFiles[0]);
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const {dndPromptActive, dndPromptInactive} = useI18nMessages();

  return (
    <div
      className={classNames('Dropzone', {
        'is-drag-active': isDragActive
      })}
      {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{dndPromptActive}</p>
      ) : (
        <p>{dndPromptMessage || dndPromptInactive}</p>
      )}
    </div>
  );
}

export default Dropzone;
