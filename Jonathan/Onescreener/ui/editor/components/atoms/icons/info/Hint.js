import React from 'react'
import { toSquidInkIcon } from '../mixins/toSquidInkIcon'

export const HintIcon = toSquidInkIcon(
  () => (
    <g id="hint-icon">
      <circle cx="9.5" cy="9" r="8.4" strokeWidth="1.2" />
      <rect x="8.5" y="7.5" width="2" height="7.5" rx="1" />
      <rect x="8.25" y="3.5" width="2.5" height="2.5" rx="1.25" />
    </g>
  ),
  '0 0 19 18'
)
