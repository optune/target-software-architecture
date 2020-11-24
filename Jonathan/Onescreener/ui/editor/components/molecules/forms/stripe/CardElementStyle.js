import React from 'react'
import styled from 'styled-components'

import { MediaSmall } from '@optune/react-base-components'

import {
  ForegroundColor,
  ColorLightGreySecond,
  ColorSecondary10,
  ColorSecondary30,
  ColorSecondary60,
} from '../../../../styles/color'
import { FontFamilyRegular } from '../../../../styles/font'
import { SelectShadow } from '../../../../styles/shadow'

export const CardStyle = {
  base: {
    iconColor: ColorSecondary10,
    color: ColorSecondary10,
    fontFamily: FontFamilyRegular,
    fontSize: '14px',

    '::placeholder': {
      color: ColorSecondary60,
      fontWeight: 'normal',
    },
  },
  invalid: {
    iconColor: ForegroundColor.error,
    color: ForegroundColor.error,
  },
}

const InputLabel = styled.h5`
  color: ${ColorSecondary30};
  font-size: 13px;
  margin: 0 0 5px 2px;
  font-weight: 500;
  text-transform: initial;
`

const CardElementComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 16px;

  & .card-input-field {
    height: 38px;
    padding: 0.6rem 0.58rem;
    border-radius: 2px;
    border: 2px solid ${ColorLightGreySecond};
    background-color: white;

    color: ${({ error, valid }) =>
      (error && ForegroundColor.error) ||
      (valid && ForegroundColor.secondary) ||
      ForegroundColor.light};
    font-size: 14px;
    line-height: 1;
    width: 100%;

    :focus {
      outline-style: none;
    }
  }

  @media ${MediaSmall} {
    & .card-input-field {
      height: 34px;
      padding: 0.65rem 0.58rem;
    }
  }
`

export const CardElement = ({ children, label, ...other }) => (
  <CardElementComponent {...other}>
    {label && <InputLabel>{label}</InputLabel>}
    {children}
  </CardElementComponent>
)
