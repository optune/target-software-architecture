// React
import styled, { css } from 'styled-components'

// Styles
import {
  BackgroundColor,
  ForegroundColor,
  ColorWhite,
  ColorSecondary10,
} from '../../../styles/color'
import { MediaMobile } from '@optune/onescreener-base-components'

// Atoms
import { Button } from './Button'

export const ActionButton = styled(Button)`
  padding: 1rem 2rem;
  margin: 0.2rem auto;
  width: 100%;
  max-width: ${({ fullWidth }) => (fullWidth ? 'unset' : '340px')};

  &[disabled] {
    color: ${BackgroundColor.disabled};
    background-color: ${ForegroundColor.disabled};
  }

  ${({ secondary }) =>
    secondary &&
    css`
      color: ${ColorSecondary10};
      background-color: transparent;
    `}

  @media ${MediaMobile} {
    max-width: unset;
  }
`
