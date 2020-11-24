import styled from 'styled-components'

import { MediaSmall } from '@optune/onescreener-base-components'

import { BackgroundColor, ColorBright } from '../../../styles/color'

export const ModalForm = styled.form`
  position: relative;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px ${({ isNarrow }) => (isNarrow ? 96 : 60)}px 10px;
  background: ${BackgroundColor.secondary};
  border-radius: 4px;

  @media ${MediaSmall} {
    background-color: ${ColorBright};
    width: 100%;
    padding: 60px 22px 15px;
  }
`
