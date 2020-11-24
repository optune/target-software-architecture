import React from 'react'
import { toSquidInkIcon, defaultStrokeFill } from '../mixins/toSquidInkIcon'

export const LayoutIcon = toSquidInkIcon(
  () => (
    <g id="layout">
      <mask id="path-1-inside-1" fill="white">
        <rect x="2.5" y="2.5" width="15" height="5.83333" rx="0.833333" />
      </mask>
      <rect
        x="2.5"
        y="2.5"
        width="15"
        height="5.83333"
        rx="0.833333"
        stroke="#0A1C3B"
        strokeWidth="2"
        mask="url(#path-1-inside-1)"
      />
      <mask id="path-2-inside-2" fill="white">
        <rect x="2.5" y="10" width="8.33333" height="6.66667" rx="0.833333" />
      </mask>
      <rect
        x="2.5"
        y="10"
        width="8.33333"
        height="6.66667"
        rx="0.833333"
        stroke="#0A1C3B"
        strokeWidth="2"
        mask="url(#path-2-inside-2)"
      />
      <mask id="path-3-inside-3" fill="white">
        <rect x="12.5" y="10" width="5" height="6.66667" rx="0.833333" />
      </mask>
      <rect
        x="12.5"
        y="10"
        width="5"
        height="6.66667"
        rx="0.833333"
        stroke="#0A1C3B"
        strokeWidth="2"
        mask="url(#path-3-inside-3)"
      />
    </g>
  ),
  '0 0 20 20'
)
