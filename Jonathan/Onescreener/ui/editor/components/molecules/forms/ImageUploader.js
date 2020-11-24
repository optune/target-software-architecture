/* eslint-disable react/prop-types */
import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'

import { getImageUrl } from '@optune/onescreener-base-components'
import { Row, ZIndex1, Column, ComponentLoading } from '@optune/react-base-components'

// Styles
import { BackgroundColor, ColorSecondary60, ForegroundColor } from '../../../styles/color'

// Atoms
import { Button } from '../../atoms/buttons/Button'
import { DeleteButton, ButtonHeight } from '../../atoms/buttons/DeleteButton'
import { InfoText } from '../../atoms/text/InfoText'
import { Text } from '../../atoms/text/InfoText'
import { BigText } from '../../atoms/text/BigText'
import { DragDropIcon } from '../../atoms/icons/control/DragDrop'

const FocusPointBackground = `radial-gradient(circle at center center, rgba(${BackgroundColor.primaryRGB},1.0), rgba(${BackgroundColor.primaryRGB},0.2))`

const HEIGHT = '54vh'
const MAX_FILE_SIZE = 20971520 // Set by cloudinary

const Picture = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: ${({ previewHeight = HEIGHT }) => previewHeight};
  cursor: ${({ cursorAuto, fullscreen }) => (cursorAuto || !fullscreen ? 'auto' : 'crosshair')};
  object-fit: scale-down;
  transition: min-height 0.5s ease-out;
`

const FocusPoint = styled.div`
  position: absolute;
  left: calc(${({ left }) => left} - 20px);
  top: calc(${({ top }) => top} - 20px);
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid ${BackgroundColor.accent};
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  z-index: ${ZIndex1};
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    color: ${ForegroundColor.primar};
    text-align: center;
    line-height: 1;
  }
`

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: -${ButtonHeight * 0.5}px;
  right: ${ButtonHeight * 0.62}px;
  z-index: 2;
  ${({ hidden }) =>
    hidden &&
    css`
      visibility: hidden;
    `};
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
  min-height: ${({ withFullscreen, fullscreen, isImage }) =>
    withFullscreen && !fullscreen && isImage ? HEIGHT : '0vh'};
  max-height: ${({ previewHeight = HEIGHT }) => previewHeight};
  min-width: ${({ fullscreen }) => (fullscreen ? '1%' : '100%')};
  max-width: 100%;
  background-color: ${({ color }) => color || BackgroundColor.secondary};
  transition: min-height 0.5s ease-in-out, min-width 0.5s ease-in-out, height 0.5s ease-in-out,
    width 0.5s ease-in-out;
`

const PictureWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${({ fullscreen }) => (fullscreen ? '100%' : 'auto')};
  max-height: ${({ previewHeight = HEIGHT }) => previewHeight};
  overflow: hidden;
  z-index: 1;
  transition: height 0.5s ease-out, max-height 0.5s ease-out;
  ${({ fullscreen, color }) =>
    !fullscreen && color
      ? css`
          background-color: ${color};
        `
      : css`
          background-image: url('https://d2cu5zba7j2d0m.cloudfront.net/img/transparency-indicator.png');
          background-repeat: repeat;
        `}
`

const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 14px;
`

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ progress }) => progress}%;
  height: 100%;
  border-radius: 2px;
  background-color: ${BackgroundColor.accent};
`

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > *:first-child {
    margin-bottom: 2rem;
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: black;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorContainer = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: 0px;
  width: 100%;
  ${({ error }) =>
    !error &&
    css`
      margin-bottom: 0px;
    `}
  transition: margin-bottom 0.3s ease-out;
`

const ErrorText = styled(InfoText)``

const Dropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ isDragActive }) =>
    isDragActive ? ForegroundColor.accentInvert : ForegroundColor.light};
  margin-bottom: 8px;
  box-sizing: border-box;
  background-color: transparent;
  color: ${ForegroundColor.light};

  cursor: pointer;

  height: 12rem;
  width: 12rem;
  outline: none;
  transition: border 0.24s ease-in-out;
`

const ContainerDrag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`

const SupportedFormatsText = styled(InfoText)`
  font-size: 12px;
  color: ${ColorSecondary60};
`

const mapFocusPoint = (e) => {
  const { top, left, width, height } = e.target.getBoundingClientRect()
  const posX = (Math.floor(e.clientX - left) / width) * 100
  const posY = (Math.floor(e.clientY - top) / height) * 100

  const focusPoint = `${Math.round(posX)}% ${Math.round(posY)}%`

  return focusPoint
}

const mapFocusPointScreen = (focusPoint = '50% 50%') => {
  const pictureImg = document.getElementById('picture-image')
  const pictureWrapper = document.getElementById('picture-wrapper')

  const stylesImg = window.getComputedStyle(pictureImg)
  const margin = parseFloat(stylesImg.marginLeft) + parseFloat(stylesImg.marginRight)

  const { width, height } = pictureImg.getBoundingClientRect()
  const { width: parentWidth, height: parentHeight } = pictureWrapper.getBoundingClientRect()

  const [posX, posY] = focusPoint.replace(/%/g, '').split(' ')

  const left = Math.floor(((width + margin) / parentWidth) * posX)
  const top = Math.floor((height / parentHeight) * posY)

  return { top: `${top}%`, left: `${left}%` }
}

export const ImageUploader = ({
  id,
  color,
  cursorAuto,
  error,
  focusPoint,
  fullscreen,
  image,
  isLoading,
  isNoneSelected,
  minWidth,
  maxWidth,
  onChange,
  onDelete,
  onSetFocusPoint,
  previewHeight,
  progress,
  showDeleteButton,
  setShowDeleteButton,
  setFileUpload,
  supportedFormats,
  uploadButtonText,
  withFullscreen,
}) => {
  const { t } = useTranslation()

  const [isDownloading, setIsDownloading] = useState(
    (!image && false) || (!image?.url && false) || true
  )
  const [isUploaded, setIsUploaded] = useState(false) // Uploaded by user

  const [focusPointScreen, setFocusPointScreen] = useState(focusPoint)
  useEffect(() => {
    const mappedFocusPoint = mapFocusPointScreen(focusPoint)
    setFocusPointScreen(mappedFocusPoint)
  }, [focusPoint, image, isUploaded, isDownloading])

  useEffect(() => {
    if (!isLoading) {
      if (image?.url > '') {
        setIsDownloading(true)
      }
      if (!isUploaded) {
        setShowDeleteButton(false)
      }
    }
  }, [isLoading])

  const uploadedImage = useRef(null)
  const imageUploader = useRef(null)

  const handleImageUpload = (event) => {
    if (event.target.files) {
      const [file] = event.target.files
      const reader = new FileReader()
      const { current } = uploadedImage
      current.file = file

      reader.onload = (event) => {
        setIsUploaded(true)
        current.src = event.target.result
      }
      reader.readAsDataURL(file)
    } else {
      if (event.dataTransfer.files > 0) {
        const [file] = event.dataTransfer.files
        const reader = new FileReader()
        const { current } = uploadedImage
        current.file = file

        reader.onload = (event) => {
          setIsUploaded(true)
          current.src = event.target.result
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections, event) => {
      const file = event.target.files ? event.target.files[0] : event.dataTransfer.files[0]
      const { name, size } = file

      const fileFormat = name.split('.').slice(-1)[0].toLowerCase()

      const isSupportedFile = supportedFormats
        .split(',')
        .map((type) => type.trim())
        .includes(fileFormat)

      const isSmallEnough = size < MAX_FILE_SIZE

      if (!isSupportedFile) {
        setFileUpload({ file: image, error: { message: 'File format is not supported' } })
      } else if (!isSmallEnough) {
        setFileUpload({ file: image, error: { message: 'File is too big' } })
      } else {
        setFileUpload({ file: image, error: null })
        onChange(event)
        handleImageUpload(event)
      }
    },
  })

  return (
    <Fragment>
      <ErrorContainer center marginBottom error={error}>
        <InfoText warning>{error?.message || ''}</InfoText>
      </ErrorContainer>
      {image?.url && !isUploaded && isDownloading ? (
        <LoadingBox>
          <InfoText>{t('uploader.imageDownloading')}</InfoText>
          <ComponentLoading />
        </LoadingBox>
      ) : null}
      <ImageContainer
        color={color}
        withFullscreen={withFullscreen}
        fullscreen={fullscreen}
        previewHeight={previewHeight}
        isImage={image?.url > ''}
      >
        <DeleteButtonWrapper hidden={!showDeleteButton}>
          <DeleteButton onDelete={onDelete} />
        </DeleteButtonWrapper>
        <PictureWrapper
          id="picture-wrapper"
          color={color}
          fullscreen={fullscreen}
          previewHeight={previewHeight}
        >
          <Picture
            id="picture-image"
            data-cy-uploaded={!isLoading && isUploaded}
            src={getImageUrl(true)({ image })}
            ref={uploadedImage}
            alt=""
            cursorAuto={cursorAuto}
            focusPoint={focusPoint}
            fullscreen={fullscreen}
            onClick={(e) => fullscreen && !!onSetFocusPoint && onSetFocusPoint(mapFocusPoint(e))}
            onLoad={() => {
              if (!isUploaded) {
                setShowDeleteButton(true)
                setIsDownloading(false)
              }
            }}
            previewHeight={previewHeight}
          />
          {withFullscreen && fullscreen && image?.url && !isLoading && (
            <FocusPoint left={focusPointScreen.left} top={focusPointScreen.top}>
              <p className="font-nano-bold">{t('uploader.focusPoint')}</p>
            </FocusPoint>
          )}
        </PictureWrapper>
        {isLoading && (
          <ImageOverlay>
            <ComponentLoading />
          </ImageOverlay>
        )}
      </ImageContainer>
      {isLoading && (
        <Row marginTop center>
          <Column twoThird>
            <ProgressWrapper>
              <ProgressBar progress={progress} />
              <Text style={{ mixBlendMode: 'difference', color: BackgroundColor.accent }}>
                {progress}%
              </Text>
            </ProgressWrapper>
          </Column>
        </Row>
      )}

      <ContainerDrag>
        <Dropzone
          {...getRootProps({ isDragActive, isDragAccept, isDragReject, className: 'dropzone' })}
        >
          <input id={id || 'upload'} ref={imageUploader} {...getInputProps()} />
          <DragDropIcon />
          <InfoText>{t('uploader.dropzoneText')}</InfoText>
        </Dropzone>

        <SupportedFormatsText>
          {t('uploader.supportedFormats') + ':'} <b>{supportedFormats}</b>
        </SupportedFormatsText>
        <Row hide={!fullscreen}>
          <SupportedFormatsText>
            {t('uploader.recommendedWidth', { minWidth, maxWidth })}
          </SupportedFormatsText>
        </Row>
      </ContainerDrag>
    </Fragment>
  )
}
