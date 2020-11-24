/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { Position } from '/imports/api'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

const WhiteRGB = '255, 255, 255'
const GridCellSize = 45
const Gradient = ({ selected }) =>
  (selected && BackgroundColor.accent) || BackgroundColor.interactive

const Select = styled.div`
  display: grid;
  grid-template-rows: ${GridCellSize * 2}px ${GridCellSize * 2}px ${GridCellSize}px ${GridCellSize}px;
  grid-template-columns: ${GridCellSize}px ${GridCellSize}px ${GridCellSize * 2}px ${GridCellSize}px ${GridCellSize}px;
  align-items: stretch;
  justify-items: stretch;
  background: ${BackgroundColor.ColorWhite};
  box-shadow: ${SelectShadow};

  width: ${GridCellSize * 6}px;
  height: ${GridCellSize * 6}px;
`

const Option = styled.button`
  border: 1px dotted ${ForegroundColor.light};
  background: ${({ selected, degree }) => Gradient({ selected, degree })};

  ${({ row, column }) => css`
    grid-row: ${row} / ${row};
    grid-column: ${column};
  `}

  &:hover {
    ${({ selected }) =>
      !selected &&
      css`
        background-color: ${BackgroundColor.accent};
        border: 1px solid ${ForegroundColor.accent};
      `}
  }

  transition: background-color 0.35s ease-out, border 0.3s ease-out;
`

const PositionOptions = [
  { row: '2', column: '1 / span 1', value: Position.CENTER_LEFT, degree: 90 },
  { row: '2', column: '5 / span 1', value: Position.CENTER_RIGHT, degree: -90 },
  { row: '4', column: '1 / span 2', value: Position.BOTTOM_LEFT, degree: 0 },
  { row: '4', column: '3 / span 1', value: Position.BOTTOM_CENTER, degree: 0 },
  { row: '4', column: '4 / span 2', value: Position.BOTTOM_RIGHT, degree: 0 },
]

export const SelectBorderPosition = ({ position, onChange }) => (
  <Select>
    {PositionOptions.map((option, index) => (
      <Option
        selected={option.value === position}
        key={`option-${index}`}
        onClick={() => onChange(option.value)}
        disabled={option.disabled}
        {...option}
      />
    ))}
  </Select>
)
