import React from 'react'
import { toSquidInkIcon, defaultStrokeFill } from '../mixins/toSquidInkIcon'

export const AddIcon = toSquidInkIcon(
  () => (
    <g id="add">
      <line
        x1="4.5"
        y1="8.5"
        x2="4.5"
        y2="0.5"
        stroke="#0A1C3B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="8.5"
        y1="4.5"
        x2="0.5"
        y2="4.5"
        stroke="#0A1C3B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),
  '0 -3.5 16 16'
)
