import classNames from 'classnames';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {useI18nMessages} from '../../hooks';

function Dropzone({onFilesDrop, dndPromptMessage}) {
  const onDrop = useCallback(onFilesDrop, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const {dnd_prompt_active, dnd_prompt_inactive} = useI18nMessages();

  return (
    <div
      className={classNames('Dropzone', {
        'is-drag-active': isDragActive
      })}
      {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{dnd_prompt_active}</p>
      ) : (
        <p>{dndPromptMessage || dnd_prompt_inactive}</p>
      )}
    </div>
  );
}

export default Dropzone;
