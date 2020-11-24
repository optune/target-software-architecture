// React
import React from 'react'
import PropTypes from 'prop-types'

// Styles
import styled from 'styled-components'

import {
  MediaSmall,
  ColorHarlequin,
  ColorStormGray,
  ColorSofterGrey,
} from '@optune/react-base-components'

const Dimension = {
  desktop: {
    BUTTON_SIZE: 48,
    ICON_SIZE: 32,
  },

  mobile: {
    BUTTON_SIZE: 36,
    ICON_SIZE: 24,
  },
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  min-width: ${Dimension.desktop.BUTTON_SIZE}px;
  min-height: ${Dimension.desktop.BUTTON_SIZE}px;
  /* z-index: 2; */
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ selected }) => (selected ? ColorHarlequin : ColorSofterGrey)};
  &:hover {
    border-color: ${ColorHarlequin};
  }
  transition: border 0.3s ease-out;
  @media ${MediaSmall} {
    width: ${Dimension.mobile.BUTTON_SIZE}px;
    height: ${Dimension.mobile.BUTTON_SIZE}px;
  }
  & svg.icon {
    margin: ${(Dimension.desktop.BUTTON_SIZE - Dimension.desktop.ICON_SIZE) / 2}px;
    width: ${Dimension.desktop.ICON_SIZE}px;
    height: ${Dimension.desktop.ICON_SIZE}px;
    transition: fill 0.3s ease;
    transition-delay: 0.3s;
    @media ${MediaSmall} {
      margin: ${(Dimension.mobile.BUTTON_SIZE - Dimension.mobile.ICON_SIZE) / 2}px;
      width: ${Dimension.mobile.ICON_SIZE}px;
      height: ${Dimension.mobile.ICON_SIZE}px;
    }
    & path,
    line,
    circle,
    polygon,
    polyline,
    rect {
      fill: ColorStormGray;
      stroke: ColorStormGray;
      transition: fill 0.3s ease, stroke 0.3s ease;
      transition-delay: 0.3s;
    }
    fill: none;
  }
`

const Input = styled.input`
  background-color: transparent;
  display: none;
  border: none;
  outline: none;
  padding: 0;
`

const Label = styled.label`
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  text-align: center;
`

export const SelectButton = ({ Icon, theme, onSelect, selected, disabled }) => {
  return (
    <ButtonContainer
      selected={selected}
      disabled={disabled}
      theme={theme}
      onClick={(e) => {
        e.preventDefault()
        onSelect()
      }}
    >
      <Icon />
    </ButtonContainer>
  )
}

SelectButton.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onSelect: PropTypes.func,
  theme: PropTypes.object,
  Icon: PropTypes.func,
}
