import React from 'react'
import { toSquidInkIcon } from '../mixins/toSquidInkIcon'

export const BackIcon = toSquidInkIcon(
  () => (
    <g id="back">
      <path
        fill="none"
        d="M9 1L0.999999 9L9 17"
        stroke="#0A1C3B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),
  '0 0 10 18'
)
