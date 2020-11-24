import React, { useState, useEffect, Fragment } from 'react'
import { SketchPicker } from 'react-color'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

// Base Components
import {
  Row,
  Column,
  FontFamilyBold,
  MediaSmall,
  NotMediaSmall,
  ZIndex2,
  ZIndex3,
} from '@optune/react-base-components'

// Styles
import { BackgroundColor, ForegroundColor, ColorGrey } from '../../../styles/color'

// Atoms
import { Button } from '../../atoms/buttons/Button'

const DefaultHoverColor = `rgba(${ColorGrey}, 0.3)`

const ColorPickerContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 150px;

  @media ${MediaSmall} {
    width: 70px;
  }
`

const ColorCircle = styled.a`
  position: relative;
  cursor: pointer;
  background-color: ${({ color }) => color};
  border: 2px solid ${ForegroundColor.hover};
  border-radius: 50%;
  height: 35px;
  width: 35px;

  ${({ open }) =>
    !open &&
    css`
      &:hover {
        border: 2px solid ${ForegroundColor.hover};
        background-color: ${({ color }) => color || DefaultHoverColor};
        filter: brightness(70%) saturate(300%);
      }
    `}

  ${({ open }) =>
    open &&
    css`
      border: 2px solid ${ForegroundColor.hover};
      background-color: ${({ color }) => color || DefaultHoverColor};
    `}
`

const ColorTitle = styled.p`
  width: 100%;
  color: ${({ dark }) => (dark ? ForegroundColor.primary : ForegroundColor.base)};
  font-size: 0.7rem;
  text-align: center;
  margin-top: 0.5rem;

  @media ${MediaSmall} {
    display: none;
  }
`

const ColorShortTitle = styled.p`
  display: none;
  width: 100%;
  color: ${({ dark }) => (dark ? ForegroundColor.primary : ForegroundColor.base)};
  font-size: 0.7rem;
  text-align: center;
  margin-top: 0.5rem;

  @media ${MediaSmall} {
    display: block;
  }
`

const ColorPickerOverlay = styled.div`
  position: absolute;
  width: 245px;
  left: -105px;
  top: -328px;
  z-index: ${ZIndex2};

  @media ${MediaSmall} {
    position: fixed;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media ${NotMediaSmall} {
    &::before {
      content: '';
      position: absolute;
      top: calc(100% - 10px); /*i.e. half the height*/
      left: 110px;
      height: 20px;
      width: 20px;
      background: white;
      transform: rotate(45deg);
      border-bottom: inherit;
      border-right: inherit;
      box-shadow: inherit;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
      z-index: ${ZIndex3};
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 20px;
      bottom: 0;
      background-color: white;
      background: white;
      z-index: ${ZIndex3};
    }
  }
`

const ColorPickerOverlayClose = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: ${ZIndex2};
`

const ColorPickerModal = styled.div`
  position: relative;
  background-color: ${BackgroundColor.secondary};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;

  & .scketch-picker {
    box-shadow: none !important;
    border-radius: none !important;
  }
`

const ColorPickerTitle = styled.p`
  width: 100%;
  color: ${ForegroundColor.base};
  font-family: ${FontFamilyBold};
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
`

const CancelButton = styled(Button)`
  margin-left: 0.5rem;
  z-index: ${ZIndex3 + 1};
`

const SaveButton = styled(Button)`
  margin-right: 0.5rem;
  width: 110px;
  z-index: ${ZIndex3 + 1};
`

export const ColorPicker = ({ color, light, title, shortTitle, onSave, open, setOpen }) => {
  const { t } = useTranslation()

  const [initialized, setInitialized] = useState(false)
  const [selectedColor, setSelectedColor] = useState(color || '')

  useEffect(() => {
    setInitialized(true)
  }, [initialized])

  return (
    <ColorPickerContainer>
      <ColorCircle color={selectedColor} open={open} onClick={() => !open && setOpen(true)}>
        {open && (
          <Fragment>
            <ColorPickerOverlayClose onClick={() => setOpen(false)} />

            <ColorPickerOverlay className="animated fadeIn">
              <ColorPickerModal>
                <ColorPickerTitle>{title}</ColorPickerTitle>
                <Row center style={{ paddingBottom: 10 }}>
                  <Column center>
                    <SketchPicker
                      color={selectedColor}
                      onChangeComplete={(color) =>
                        setSelectedColor(`rgba(${Object.values(color.rgb).join(',')})`)
                      }
                    />
                  </Column>
                </Row>

                <Row bottom center>
                  <Column fullwidth spaceBetween flow="row">
                    <CancelButton secondary onClick={() => setOpen(false)}>
                      {t('colorPicker.cancel')}
                    </CancelButton>

                    <SaveButton
                      onClick={() => {
                        setOpen(false)
                        onSave(selectedColor)
                      }}
                    >
                      {t('colorPicker.setColor')}
                    </SaveButton>
                  </Column>
                </Row>
              </ColorPickerModal>
            </ColorPickerOverlay>
          </Fragment>
        )}
      </ColorCircle>

      {title && <ColorTitle dark={!light}>{title}</ColorTitle>}
      {shortTitle && <ColorShortTitle dark={!light}>{shortTitle}</ColorShortTitle>}
    </ColorPickerContainer>
  )
}
