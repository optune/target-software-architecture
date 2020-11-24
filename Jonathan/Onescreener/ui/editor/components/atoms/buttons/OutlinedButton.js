import React from 'react'
import styled, { css } from 'styled-components'

import { Button, ButtonFirefox } from './Button'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'

export const OutlinedButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;
  max-width: 480px;
  margin: 0.2rem auto;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  border: 2px solid ${ForegroundColor.primary};
  overflow: hidden;

  ${({ selected }) =>
    selected &&
    css`
      background: ${BackgroundColor.secondary};
      color: ${ForegroundColor.hover};
      border: 2px solid ${ForegroundColor.hover};
    `}
`

export const OutlinedButtonFirefox = styled(ButtonFirefox)`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
  max-width: 480px;
  margin: 0.2rem auto;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  border: 2px solid ${ForegroundColor.primary};
  overflow: hidden;

  ${({ selected }) =>
    selected &&
    css`
      background: ${BackgroundColor.secondary};
      color: ${ForegroundColor.hover};
      border: 2px solid ${ForegroundColor.hover};
    `}
`
