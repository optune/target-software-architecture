import styled from 'styled-components'

import { FontFamilyRegular } from '@optune/react-base-components'

import { ColorLightGreySecond, ColorSecondary60, ForegroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

export const TextArea = styled.textarea`
  font-size: ${({ small }) => (small ? 14 : 16)}px;
  font-family: ${FontFamilyRegular};
  width: 100%;
  resize: vertical;
  margin: ${({ margin, small }) => margin || (small && 0.1) || 1}rem 0;
  padding: ${({ small }) => (small ? '0.6rem 0.58rem' : '1rem 1.5rem')};
  border-radius: 2px;
  border: 2px solid ${ColorLightGreySecond};
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
