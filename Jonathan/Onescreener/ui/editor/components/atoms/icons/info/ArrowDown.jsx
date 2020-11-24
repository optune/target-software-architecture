import React from 'react'
import { toSquidInkIcon, defaultStrokeFill } from '../mixins/toSquidInkIcon'

export const ArrowDownIcon = toSquidInkIcon(
  () => (
    <g id="awwor-down">
      <path d="M16 10L12 14L8 10" {...defaultStrokeFill} strokeWidth="1" />
    </g>
  ),
  '0 0 24 24'
)
