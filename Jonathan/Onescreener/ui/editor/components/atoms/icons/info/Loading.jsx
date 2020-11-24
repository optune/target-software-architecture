import React from 'react'
import styled from 'styled-components'
import { toSquidInkIcon } from '../mixins/toSquidInkIcon'

import { ColorHarlequin } from '../../../../styles/color'

const LoadingCircle = styled.circle`
  fill: none;
  stroke: ${ColorHarlequin};
  stroke-linecap: round;
  stroke-width: 2;
  animation: circley-small 5.333s ease infinite, rotaty 2.2s linear infinite;
  transform-origin: center center;
`

export const LoadingIcon = toSquidInkIcon(
  () => (
    <g id="loading-icon">
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" />
      <LoadingCircle cx="12" cy="12" r="8" />
    </g>
  ),
  '0 0 24 24'
)
