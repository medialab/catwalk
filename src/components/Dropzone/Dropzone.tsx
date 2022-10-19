import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function Dropzone({
  onFilesDrop
}) {
  const onDrop = useCallback(onFilesDrop, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="Dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default Dropzone;