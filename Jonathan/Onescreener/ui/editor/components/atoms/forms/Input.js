import React from 'react'
import styled from 'styled-components'

import {
  ForegroundColor,
  BackgroundColor,
  ColorLightGreySecond,
  ColorSecondary30,
  ColorSecondary60,
} from '../../../styles/color'

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: ${({ margin, small }) => margin || (small && 0.5) || 1}rem 0;
`

const InputLabel = styled.h5`
  color: ${ColorSecondary30};
  font-size: 13px;
  margin: 0 0 5px 2px;
  font-weight: 500;
  text-transform: initial;
`

const InputComponent = styled.input`
  font-size: ${({ big }) => (big ? 16 : 14)}px;
  width: 100%;
  padding: 0.6rem 0.58rem;

  background: ${BackgroundColor.secondary};
  border: 2px solid ${ColorLightGreySecond};
  border-radius: 2px;
  /* color: ${({ error, valid }) => (error && ForegroundColor.error) || 'black'}; */
  color: ${({ error, valid }) =>
    (error && ForegroundColor.error) ||
    (valid && ForegroundColor.secondary) ||
    ForegroundColor.secondary};

  &:focus {
    outline-style: none;
  }

  &::placeholder {
    color: ${ColorSecondary60};
  }
`

export const Input = ({ label, dataCyInput, onBlur, onFocus, onClick, ...other }) => (
  <InputWrapper {...other}>
    {label && <InputLabel>{label}</InputLabel>}
    <InputComponent
      data-cy-input={dataCyInput}
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={onClick}
      {...other}
    />
  </InputWrapper>
)
