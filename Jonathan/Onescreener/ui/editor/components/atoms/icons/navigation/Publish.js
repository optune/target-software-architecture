import React from 'react'
import { toSquidInkIcon, defaultStrokeFill } from '../mixins/toSquidInkIcon'

export const PublishIcon = toSquidInkIcon(() => (
  <g id="globe">
    <circle {...defaultStrokeFill} cx="24" cy="24" r="22" />
    <line {...defaultStrokeFill} x1="24" y1="2" x2="24" y2="46" />
    <line {...defaultStrokeFill} x1="43" y1="14" x2="5" y2="14" />
    <line {...defaultStrokeFill} x1="43" y1="34" x2="5" y2="34" />
    <path
      {...defaultStrokeFill}
      d="M23.110445,1.9996911C30.3425026,6.6477661,35.1333351,14.7644043,35.1333351,24S30.3425026,41.3522339,23.110445,46.000309"
    />
    <path
      {...defaultStrokeFill}
      d="M24.1333332,46.000309C16.9012756,41.3522339,12.1104441,33.2355957,12.1104441,24s4.7908316-17.3522339,12.0228891-22.000309"
    />
  </g>
))
