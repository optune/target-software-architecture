import React from 'react'
import { toSquidInkIcon, defaultStrokeFill } from '../mixins/toSquidInkIcon'

export const PreviewIcon = toSquidInkIcon(
  () => (
    <g id="eye-reader">
      <path
        d="M2.6543 11.9797C2.6543 11.9797 4.73652 5.3335 12.2376 5.3335C19.5938 5.3335 21.821 12.0002 21.821 12.0002C21.821 12.0002 19.6768 18.6668 12.2376 18.6668C4.79184 18.6668 2.6543 11.9797 2.6543 11.9797Z"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15.1852 9.05388C16.8124 10.6811 16.8124 13.3193 15.1852 14.9464C13.558 16.5736 10.9198 16.5736 9.29265 14.9464C7.66547 13.3192 7.66547 10.6811 9.29265 9.05388C10.9198 7.4267 13.558 7.4267 15.1852 9.05388Z"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  ),
  '0 0 25 24'
)
