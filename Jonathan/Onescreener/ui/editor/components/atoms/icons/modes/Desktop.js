import React from 'react'
import { toSquidInkIcon } from '../mixins/toSquidInkIcon'

export const DesktopIcon = toSquidInkIcon(
  () => (
    <g id="desktop">
      <path
        d="M36.15 30H3.85C3.38056 30 3 29.6295 3 29.1724V6.82759C3 6.37052 3.38056 6 3.85 6H36.15C36.6194 6 37 6.37052 37 6.82759V29.1724C37 29.6295 36.6194 30 36.15 30Z"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M24.1663 35.1666H15.833" strokeWidth="2" />
      <path d="M20 31V35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.33301 26H36.6663" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  '0 0 40 40'
)
