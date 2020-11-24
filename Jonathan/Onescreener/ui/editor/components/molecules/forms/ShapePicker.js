// React
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

// Base components
import { Row, Column } from '@optune/react-base-components'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'

const ShapeColumn = styled(Column)`
  width: 280px;
`

const ShapeOption = styled.button`
  display: block;
  width: 60px;
  height: 60px;
  margin: 0;
  background-color: ${({ selected }) =>
    selected ? BackgroundColor.accent : BackgroundColor.secondary};
  background: ${({ selected }) => (selected ? BackgroundColor.accent : BackgroundColor.secondary)};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  border: 2px solid ${BackgroundColor.secondary};

  &:hover {
    ${({ selected }) =>
      !selected &&
      css`
        background-color: ${BackgroundColor.accent};
        border: 2px solid ${ForegroundColor.hover};
      `}
  }

  transition: background-color 0.35s ease-out, border 0.3s ease-out;
`

const Circle = styled(ShapeOption)`
  border-radius: 50%;
`

const RoundedSquare = styled(ShapeOption)`
  border-radius: 0.4rem;
`

const Square = styled(ShapeOption)``

export const ShapePicker = ({ shape, onChange }) => (
  <Row center>
    <ShapeColumn inline spaceBetween flow="row">
      <Square
        onClick={() => onChange({ circle: false, square: true, value: 'SQUARE' })}
        selected={shape.square}
      />
      <RoundedSquare
        onClick={() => onChange({ circle: false, square: false, value: 'ROUNDEDSQUARE' })}
        selected={!shape.square && !shape.circle}
      />
      <Circle
        onClick={() => onChange({ circle: true, square: false, value: 'CIRCLE' })}
        selected={shape.circle}
      />
    </ShapeColumn>
  </Row>
)
