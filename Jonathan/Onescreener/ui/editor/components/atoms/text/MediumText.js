import { FontFamilyBold } from '@optune/react-base-components'
import styled from 'styled-components'

import { ForegroundColor, ColorSecondary10 } from '../../../styles/color'

export const MediumText = styled.h3`
  color: ${({ light }) => (light ? ForegroundColor.light : ColorSecondary10)};
  font-family: ${FontFamilyBold};
  font-size: ${({ headline }) => (headline ? '18px' : '14px')};
  font-weight: 600;
  margin: 8px auto 14px;
  text-align: center;
`
