import { memo, useMemo, useState, forwardRef, useImperativeHandle } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'

import { ImagePreview } from './ImagePreview'

import styles from './UploadDropzone.module.scss'

const activeStyle = {
  borderColor: '#24c2eb'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

interface Props {
  name: string
  icon?: string
  title?: string
  description?: string
  rejectedFileMsg?: string
  acceptTypes: string | string[]
  iconSize?: { width: number; height: number }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const Uploader = (
  {
    name,

    title,
    setFieldValue,

    acceptTypes,
    description,
    rejectedFileMsg = 'Choose another file',
    ...rest
  }: Props,
  ref: any
) => {
  const [preview, setPreview] = useState('')

  const handleFileProcess = (file: File[]) => {
    setFieldValue(name, file)
  }
  const {
    open,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    onDropRejected: () => {
      toast.error('File Rejected', { theme: 'dark' })
    },
    onDropAccepted: (acceptedFiles: File[]) => {
      handleFileProcess(acceptedFiles)

      const img = URL.createObjectURL(acceptedFiles[0])
    }
  })

  const activeStyle = {
    borderColor: '#24c2eb'
  }

  const acceptStyle = {
    borderColor: '#00e676'
  }

  const rejectStyle = {
    borderColor: '#ff1744'
  }

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragAccept, isDragActive, isDragReject]
  )

  useImperativeHandle(ref, () => ({
    hanleOpenUploader: () => {
      open()
    }
  }))

  return (
    <section style={{ display: 'flex', width: '100%', backgroundColor: 'red' }} {...getRootProps()}>
      <input {...getInputProps()} {...rest} />
    </section>
  )
}

export const UploadDropzone = memo(forwardRef(Uploader))
