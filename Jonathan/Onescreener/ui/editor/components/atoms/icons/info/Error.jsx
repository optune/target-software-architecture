import React from 'react'
import { toSquidInkIcon, defaultStrokeFill } from '../mixins/toSquidInkIcon'

export const ErrorIcon = toSquidInkIcon(() => (
  <g id="pain">
    <circle {...defaultStrokeFill} cx="24" cy="24" r="22" />
    <path
      {...defaultStrokeFill}
      strokeMiterlimit="10"
      d="M12.9993792,12c0,0,4.2672873,1.4666662,7.0006208,6c0,0-6.7333336-0.8666668-8,1"
    />
    <path
      {...defaultStrokeFill}
      strokeMiterlimit="10"
      d="M35.0006218,12c0,0-4.2672882,1.4666662-7.0006218,6c0,0,6.7333336-0.8666668,8,1"
    />
    <path
      {...defaultStrokeFill}
      d="M13.7469521,34.5C16.3709354,31.8760166,19.9959354,30.2530479,24,30.2530479S31.6290646,31.8760166,34.2530479,34.5"
    />
  </g>
))
