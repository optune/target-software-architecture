import { ColorHaiti, ColorMonza, FontFamilyBold } from '@optune/react-base-components'
import styled from 'styled-components'

import { ForegroundColor } from '../../../styles/color'

export const BigText = styled.h2`
  color: ${({ warning, light }) =>
    (warning && ForegroundColor.error) || (light && ForegroundColor.light) || ForegroundColor.base};
  font-family: ${FontFamilyBold};
  font-weight: bold;
  font-size: 24px;
  margin: 8px auto 24px;
  text-align: center;
`
