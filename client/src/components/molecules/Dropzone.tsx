import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { CloudUploadIcon } from '@/components/atoms/IconButton'

const isDragEvt = (value: any): value is React.DragEvent => {
  return !!value.dataTransfer
}

const isInput = (value: EventTarget | null):value is HTMLInputElement => {
  return value !== null
}

const getFilesFromEvent = (e: React.DragEvent | React.ChangeEvent): File[] => {
  if (isDragEvt(e)) {
    return Array.from(e.dataTransfer.files)
  } else if (isInput(e.target) && e.target.files) {
    return Array.from(e.target.files)
  }

  return []
}

type FileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/gif'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/pdf'

  interface DropzoneProps {
    value?: File[]
    name?: string
    acceptedFileTypes?: FileType[]
    width?: number | string
    height?: number | string
    hasError?: boolean
    onDrop?: (files: File[]) => void // Drop 입력되었을 때 이벤트 핸들러
    onChange?: (files: File[]) => void // 파일 입력 시 이벤트 핸들러
  }

  type DropzoneRootProps = {
    isFocused?: boolean
    hasError?: boolean
    width: string | number
    height: string | number
  }

  const DropzoneRoot = styled.div<DropzoneRootProps>`
    border: 1px dashed
    ${({ theme, isFocused, hasError }) => {
      if (hasError) {
        return theme.colors.danger
      } else if (isFocused) {
        return theme.colors.black
      } else {
        return theme.colors.border
      }
    }};
    border-radius: 8px;
    cursor: pointer;
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
    height: ${({ height }) =>
      typeof height === 'number' ? `${height}px` : height};
  `

  const DropzoneContent = styled.div<{
    width: string | number
    height: string | number
  }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
    height: ${({ height }) =>
      typeof height === 'number' ? `${height}px` : height};
  `

const DropzoneInputFile = styled.input`
display: none;
`

const Dropzone = (props: DropzoneProps) => {
  const {
    onDrop,
    onChange,
    value = [],
    name,
    acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
    hasError,
    width = '100%',
    height = '200px',
  } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [ isFocused, setIsFocused ] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false)

    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType),
      ),
    )

    onDrop && onDrop(files)
    onChange && onChange(files)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(false)

    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType),
      ),
    )

    if (files.length == 0) {
      return window.alert(
        `다음 형식의 파일을 올려주세요. ${acceptedFileTypes.join(
          ' ,',
        )})`,
      )
    }

    onDrop && onDrop(files)
    onChange && onChange(files)
  }

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  // 드래그해서 범위 밖으로 나갔을 경우
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(false)
  }, [])

  // 드래그해서 범위 안에 들어올 경우
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(true)
  }, [])

  const handleClick = () => {
    inputRef.current?.click()
  }

  useEffect(() => {
    if (inputRef.current && value && value.length == 0) {
      inputRef.current.value = ''
    }
  }, [value])

  return (
    <>
      <DropzoneRoot
        ref={rootRef}
        isFocused={isFocused}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onClick={handleClick}
        hasError={hasError}
        width={width}
        height={height}
      >
        <DropzoneInputFile 
          ref={inputRef}
          type="file"
          name={name}
          accept={acceptedFileTypes.join(',')}
          onChange={handleChange}
          multiple
        />
        <DropzoneContent width={width} height={height}>
          <CloudUploadIcon size={24} />
          <span style={{ textAlign: 'center' }}>기기에서 업로드</span>
        </DropzoneContent>
      </DropzoneRoot>
    </>
  )
}

Dropzone.defaultProps = {
  acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  hasError: false,
}

export default Dropzone