/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { Position } from '/imports/api'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

const GridCellSize = 45
const GridSize = 6
const GridSpan = [
  GridCellSize,
  GridCellSize,
  GridCellSize,
  GridCellSize,
  GridCellSize,
  GridCellSize,
]

const Select = styled.div`
  display: grid;
  grid-template-rows: ${GridSpan.join('px ')};
  grid-template-columns: ${GridSpan.join('px ')};
  align-items: stretch;
  justify-items: stretch;
  background: ${BackgroundColor.base};
  box-shadow: ${SelectShadow};

  width: ${GridCellSize * GridSize}px;
  height: ${GridCellSize * GridSize}px;
`

const Option = styled.button`
  margin: 0;
  background: ${({ selected, hover, isTopRight, isBottomLeft }) =>
    (selected && isTopRight && BackgroundColor.accent) ||
    (selected && isBottomLeft && BackgroundColor.accent) ||
    (selected && BackgroundColor.accent) ||
    (hover && BackgroundColor.accent) ||
    BackgroundColor.interactive};
  border: 1px dotted ${ForegroundColor.light};

  ${({ row, column }) => css`
    grid-row: ${row} / ${row};
    grid-column: ${column} / ${column};
  `}
`

const getCurrentArea = ({ position, span, spanHover }) => {
  const [startRowField, startColumnField] = position.split('/')
  const [rowSpan, columnSpan] = span.split('/')
  const [rowSpanHover, columnSpanHover] = spanHover.split('/')

  const startRow = parseInt(startRowField)
  const startColumn = parseInt(startColumnField)
  const endRow = startRow + parseInt(rowSpan) - 1
  const endColumn = startColumn + parseInt(columnSpan) - 1
  const endRowHover = startRow + parseInt(rowSpanHover) - 1
  const endColumnHover = startColumn + parseInt(columnSpanHover) - 1

  return { startRow, endRow, startColumn, endColumn, endRowHover, endColumnHover }
}

const getPositionMapper = ({ position, span, spanHover }) => {
  const { startRow, endRow, startColumn, endColumn, endRowHover, endColumnHover } = getCurrentArea({
    position,
    span,
    spanHover,
  })

  return (row, column) => {
    return {
      row,
      column,
      value: `${row}/${column}`,
      selected: row >= startRow && row <= endRow && column >= startColumn && column <= endColumn,
      isTopRight: row === startRow && column === endColumn,
      isBottomLeft: row === endRow && column === startColumn,
      hover:
        (row >= startRow &&
          row <= endRowHover &&
          column >= startColumn &&
          column <= endColumnHover) ||
        (row <= startRow &&
          row >= endRowHover &&
          column <= startColumn &&
          column >= endColumnHover) ||
        (row <= startRow &&
          row >= endRowHover &&
          column >= startColumn &&
          column <= endColumnHover) ||
        (row >= startRow &&
          row <= endRowHover &&
          column <= startColumn &&
          column >= endColumnHover),
    }
  }
}

const PositionOptions = ({ position, span, spanHover }) => {
  const getPosition = getPositionMapper({ position, span, spanHover })
  const grid = Object.keys(GridSpan)

  return grid.reduce(
    (positions, _, row) =>
      positions.concat(grid.map((_, column) => getPosition(row + 1, column + 1))),
    []
  )
}

const mapAreaValues = ({ position, span, spanHover, startSelect }) => {
  const { startRow, startColumn, endRow, endColumn, endRowHover, endColumnHover } = getCurrentArea({
    position,
    span,
    spanHover,
  })

  return (selectedPosition, isHover) => {
    let newArea = {}

    // Special case
    if (!startSelect) {
      newArea.position = `${selectedPosition.row}/${selectedPosition.column}`
      newArea.span = '1/1'
      newArea.spanHover = '1/1'
    } else {
      const newRowSpan = selectedPosition.row - startRow
      const newColumnSpan = selectedPosition.column - startColumn

      const newStartRow = isHover || newRowSpan > 0 ? startRow : selectedPosition.row
      const newStartColumn = isHover || newColumnSpan > 0 ? startColumn : selectedPosition.column

      let addSpan = 1

      // If selected edge field, unselect the row and column
      if (
        isHover &&
        ((selectedPosition.row === startRow && selectedPosition.column === startColumn) ||
          (selectedPosition.row === endRowHover && selectedPosition.column === endColumnHover))
      ) {
        addSpanHover = 0
      } else if (
        (selectedPosition.row === startRow && selectedPosition.column === startColumn) ||
        (selectedPosition.row === endRow && selectedPosition.column === endColumn)
      ) {
        addSpan = 0
      }

      newArea.position = isHover ? `${startRow}/${startColumn}` : `${newStartRow}/${newStartColumn}`
      newArea.span = isHover
        ? '1/1'
        : `${Math.abs(newRowSpan) + addSpan}/${Math.abs(newColumnSpan) + addSpan}`
      newArea.spanHover = !isHover ? '1/1' : `${newRowSpan + addSpan}/${newColumnSpan + addSpan}`
    }

    return newArea
  }
}

export const SelectArea = ({ position, span, spanHover, onChange, onSelecting }) => {
  const positionOptions = PositionOptions({ position, span, spanHover })

  const [startSelect, setStartSelect] = useState(false)

  const mapArea = mapAreaValues({ position, span, spanHover, startSelect })

  return (
    <Select>
      {positionOptions.map((option) => (
        <Option
          key={option.value}
          onMouseEnter={() => startSelect && onSelecting(mapArea(option, true))}
          onClick={() => {
            onChange(mapArea(option))
            setStartSelect(!startSelect)
          }}
          {...option}
        />
      ))}
    </Select>
  )
}
