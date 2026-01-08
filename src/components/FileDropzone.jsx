import { useDropzone } from 'react-dropzone'

export default function FileDropzone({ onFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onFiles,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className="border border-primary rounded p-4 text-center mb-3"
      style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
    >
      <input {...getInputProps()} />
      <p>Glissez-déposez vos fichiers PDF ici, ou cliquez pour sélectionner</p>
    </div>
  )
}
