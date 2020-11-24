// React
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Row, Column } from '@optune/react-base-components'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'

const LineColumn = styled(Column)`
  width: 360px;
`

const LineOption = styled.button`
  display: block;
  width: 60px;
  height: 60px;
  margin: 0;
  border-radius: ${({ shape }) => (shape.circle && '50%') || (shape.square && '0') || '0.4rem'};

  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  border-color: ${({ selected }) =>
    selected ? BackgroundColor.accent : BackgroundColor.secondary};

  &:hover {
    ${({ selected }) =>
      !selected &&
      css`
        border-color: ${ForegroundColor.hover};
      `}
  }

  transition: background-color 0.35s ease-out, border-color 0.3s ease-out;
`

const None = styled(LineOption)`
  border: none;
`

const Thin = styled(LineOption)`
  border: 0.1rem solid
    ${({ selected }) => (selected ? BackgroundColor.accent : ForegroundColor.secondary)};
`

const Normal = styled(LineOption)`
  border: 0.2rem solid
    ${({ selected }) => (selected ? BackgroundColor.accent : ForegroundColor.secondary)};
`

const Fat = styled(LineOption)`
  border: 0.4rem solid
    ${({ selected }) => (selected ? BackgroundColor.accent : ForegroundColor.secondary)};
`

export const LinePicker = ({ border, onChange, shape }) => (
  <Row center>
    <LineColumn inline spaceBetween flow="row">
      <None onClick={() => onChange(0)} selected={border === 0} shape={shape || {}} />
      <Thin onClick={() => onChange(1)} selected={border === 1} shape={shape || {}} />
      <Normal onClick={() => onChange(2)} selected={border === 2} shape={shape || {}} />
      <Fat onClick={() => onChange(3)} selected={border === 3} shape={shape || {}} />
    </LineColumn>
  </Row>
)
