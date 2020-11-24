// Node
import classNames from 'classnames'

// React
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  ColorDarkGrey,
  ColorDustyGray,
  ColorHaiti,
  ColorHarlequin,
  ColorLightGrey,
  ColorStormGray,
  ColorTimberwolf,
  ColorWhite,
} from '@optune/react-base-components'

const margin = 10

// Dimensions Big
const sizeThumbBig = 26
const sizeTrackBig = 14
const trackWidthBig = 32

// Dimensions Small
const sizeTrackSmall = 22
const sizeThumbSmall = 16
const trackWidthSmall = 44

const Button = styled.div`
  margin-left: ${margin}px;
  margin-right: ${margin}px;
`

const Track = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${({ big }) => (big ? sizeTrackBig / 2 : sizeTrackSmall / 2)}px;
  cursor: pointer;
  height: ${({ big }) => (big ? sizeTrackBig : sizeTrackSmall)}px;
  top: 2px;
  width: ${({ big }) => (big ? trackWidthBig : trackWidthSmall)}px;
  margin-left: ${({ big }) => (big ? margin * 2 : margin)}px;
  background-color: ${({ active, green, light }) =>
    (active && green && ColorDarkGrey) ||
    (active && ColorHaiti) ||
    (light && ColorTimberwolf) ||
    ColorLightGrey};

  transition: background-color 0.25s;
`

const Thumb = styled.div`
  border-radius: 50%;
  position: relative;
  left: ${({ big, active }) =>
    (active &&
      (big
        ? trackWidthBig - sizeThumbBig / 2
        : trackWidthSmall - sizeThumbSmall - (sizeTrackSmall - sizeThumbSmall) / 2)) ||
    (big ? -sizeThumbBig / 2 : (sizeTrackSmall - sizeThumbSmall) / 2)}px;
  width: ${({ big }) => (big ? sizeThumbBig : sizeThumbSmall)}px;
  height: ${({ big }) => (big ? sizeThumbBig : sizeThumbSmall)}px;
  background-color: ${({ active, green, light }) =>
    (active && green && ColorHarlequin) || (light && ColorDustyGray) || ColorStormGray};

  transition: left 0.25s, background-color 0.35s;
`

export const ToggleButton = ({
  action,
  active,
  big,
  className,
  green,
  hideTextWhenInactive,
  hook,
  light,
  name,
  text,
}) => (
  <Button className={className} data-cy={hook}>
    <div className="flex flex-center-middle">
      <p
        className={classNames('font-tiny-bold uppercase animated', {
          fadeOut: hideTextWhenInactive && !active,
          fadeIn: hideTextWhenInactive && active,
          'text-light': !active,
        })}
      >
        {text}
      </p>

      <Track
        active={active}
        big={big}
        green={green}
        light={light}
        name={name}
        onClick={() => action(!active)}
        data-cy="toggle-button"
      >
        <Thumb active={active} big={big} green={green} light={light} />
      </Track>
    </div>
  </Button>
)

ToggleButton.propTypes = {
  action: PropTypes.func,
  active: PropTypes.bool,
  big: PropTypes.bool,
  className: PropTypes.string,
  green: PropTypes.bool,
  hideTextWhenInactive: PropTypes.bool,
  hook: PropTypes.string,
  light: PropTypes.bool,
  name: PropTypes.string,
  text: PropTypes.string,
}
