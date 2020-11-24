/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { Position } from '/imports/api'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

const GridCellSize = 90
const Gradient = ({ selected }) => (selected && BackgroundColor.accent) || BackgroundColor.secondary

const Select = styled.div`
  display: grid;
  grid-template-rows: ${GridCellSize}px ${GridCellSize}px ${GridCellSize}px;
  grid-template-columns: ${GridCellSize}px ${GridCellSize}px ${GridCellSize}px;
  align-items: stretch;
  justify-items: stretch;
  background: ${BackgroundColor.darkGradient()};
  box-shadow: ${SelectShadow};

  width: ${GridCellSize * 3}px;
  height: ${GridCellSize * 3}px;
`

const Option = styled.button`
  border: 1px dotted ${ForegroundColor.light};
  background: ${({ selected }) => Gradient({ selected })};
  margin: 0;

  ${({ row, column }) => css`
    grid-row: ${row} / ${row};
    grid-column: ${column} / ${column};
  `}

  &:hover {
    ${({ selected }) =>
      !selected &&
      css`
        background-color: ${BackgroundColor.accent};
        border: 1px solid ${ForegroundColor.hover};
      `}
  }

  transition: background-color 0.35s ease-out, border 0.3s ease-out;
`

const getPosition = (position) => ({
  value: position,
  position: position.toLowerCase().replace('_', ' '),
})
const PositionOptions = [
  {
    row: '1',
    column: '1',
    ...getPosition(Position.TOP_LEFT),
  },
  {
    row: '1',
    column: '2',
    ...getPosition(Position.TOP_CENTER),
  },
  {
    row: '1',
    column: '3',
    ...getPosition(Position.TOP_RIGHT),
  },
  {
    row: '2',
    column: '1',
    ...getPosition(Position.CENTER_LEFT),
  },
  {
    row: '2',
    column: '2',
    ...getPosition(Position.CENTER_CENTER),
  },
  {
    row: '2',
    column: '3',
    ...getPosition(Position.CENTER_RIGHT),
  },
  {
    row: '3',
    column: '1',
    ...getPosition(Position.BOTTOM_LEFT),
  },
  {
    row: '3',
    column: '2',
    ...getPosition(Position.BOTTOM_CENTER),
  },
  {
    row: '3',
    column: '3',
    ...getPosition(Position.BOTTOM_RIGHT),
  },
]

export const SelectPosition = ({ position, onChange }) => (
  <Select>
    {PositionOptions.map((option) => (
      <Option
        selected={option.value === position}
        key={option.value}
        onClick={() => onChange(option.value)}
        {...option}
      />
    ))}
  </Select>
)
